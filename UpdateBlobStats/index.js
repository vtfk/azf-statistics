const { logger, logConfig } = require('@vtfk/logger')
const updateBlobStats = require('../lib/updateBlobStats')
const { mongoDB } = require('../config')

module.exports = async function (context, req) {
  logConfig({
    prefix: 'azf-statistics - UpdateBlobStats',
    azure: {
      context,
      excludeInvocationId: true
    }
  })
  logger('info', ['New run - Here we go!'])
  if (!mongoDB.e18connectionString) {
    return { status: 200, body: 'Ingen e18 her, så vi gjør itj no' }
  }

  try {
    const res = await updateBlobStats()

    return { status: 200, body: res }
  } catch (error) {
    return { status: 500, body: error.toString() }
  }
}
