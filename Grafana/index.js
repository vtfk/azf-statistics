const { logger, logConfig } = require('@vtfk/logger')
const httpResponse = require('../lib/http-response')
const statDb = require('../lib/stat-db')
const validation = require('../lib/grafana/validate-grafana-request')

module.exports = async function (context, req) {
  logConfig({
    prefix: 'azf-statistics - Grafana'
  })

  try {
    const { start, end } = req.query
    const validationResult = validation(req.query, context)
    if (!validationResult.result) {
      return httpResponse(400, validationResult.message)
    }

    logger('info', ['Fetching collections/system names'], context)
    const db = await statDb()
    const collections = await db.listCollections().toArray()
    logger('info', [`Successfully fetched collections/system names - Length: ${collections.length}`], context)

    const result = []
    const filter = {
      createdTimestamp: {
        $gte: start,
        $lte: end
      }
    }

    for (const collectionObject of collections) {
      const collection = db.collection(collectionObject.name)
      const documentCount = await collection.countDocuments(filter)
      logger('info', [`Successfully fetched ${documentCount} documents in collection ${collectionObject.name}`], context)
      result.push({
        system: collectionObject.name,
        count: documentCount
      })
    }

    return httpResponse(200, result)
  } catch (error) {
    logger('error', ['Error fetching collections/system names', error.toString()], context)
    return httpResponse(500, error)
  }
}
