const mongo = require('../lib/mongo')
const { mongoDB } = require('../config')
const { save, createBlobServiceClient } = require('@vtfk/azure-blob-client')
const { logger, logConfig } = require('@vtfk/logger')
const systems = require('../systems')

module.exports = async () => {
  logConfig({
    prefix: 'azf-statistics - UpdateBlobStats'
  })

  const db = mongo()
  const collection = db.collection(mongoDB.e18StatisticsCollection)

  logger('info', `Kobler på ${mongoDB.e18StatisticsCollection}`)
  const client = await createBlobServiceClient()

  const result = []
  // Statistikk-systemer
  for (const system of systems) {
    logger('info', `Fetching stats for ${system.name}`)
    const stats = await collection.find(system.query).project(system.projection).toArray()
    const res = system.mapper(stats)
    logger('info', `${system.name} ${res.length}`)
    /*
    res.forEach(element => {
      for (const val of Object.values(element)) {
        if (!['string', 'number'].includes(typeof val) && val !== null) {
          console.log("ÅNEI", val, element)
          throw new Error(JSON.stringify(element, null, 2))
        }
      }
    })
    */
    result.push(res)
    const container = client.getContainerClient(system.container)
    const containerExists = await container.exists()
    if (!containerExists) await container.create()
    const createBlob = await save(`${system.name}.json`, JSON.stringify(res, null, 2), { containerName: system.container })
  }
  return result
}
