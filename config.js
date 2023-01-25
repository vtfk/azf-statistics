module.exports = {
  mongoDB: {
    connectionStringRead: process.env.MONGO_DB_CONNECTION_STRING_READ ?? 'tullball',
    database: process.env.MONGO_DB_DATABASE ?? 'tulliballa',
    e18StatisticsCollection: process.env.E18_STATISTICS_COLLECTION ?? 'jauddaaa'
  }
}
