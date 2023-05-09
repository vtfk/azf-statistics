module.exports = {
  mongoDB: {
    e18connectionString: process.env.MONGO_DB_E18_CONNECTION_STRING ?? 'tullball',
    e18database: process.env.MONGO_DB_E18_DATABASE ?? 'tulliballa',
    e18StatisticsCollection: process.env.MONGO_DB_E18_STATISTICS_COLLECTION ?? 'jauddaaa',
    statisticsConnectionString: process.env.MONGO_STATISTICS_CONNECTION_STRING ?? 'tullball',
    statisticsDatabase: process.env.MONGO_DB_STATISTICS_DATABASE ?? 'tulliballa'
  },
  defaultCounty: process.env.DEFAULT_COUNTY || 'fylke'
}
