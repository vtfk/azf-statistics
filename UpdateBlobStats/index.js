const { logger, logConfig } = require('@vtfk/logger')
const updateBlobStats = require('../lib/updateBlobStats')

module.exports = async function (context, req) {
  logConfig({
    prefix: 'azf-statistics - UpdateBlobStats',
    azure: {
      context,
      excludeInvocationId: true
    }
  })
  logger('info', ['New run - Here we go!'])

  try {
    const res = await updateBlobStats()

    return { status: 200, body: res }
  } catch (error) {
    return { status: 500, body: error.toString() }
  }
}
