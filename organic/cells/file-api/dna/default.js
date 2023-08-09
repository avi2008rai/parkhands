module.exports = {
  database: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    port: process.env.DB_PORT,
  },
  file: {
    apiUrl: process.env.FILE_API_URL,
    apiEndpoint: process.env.FILE_API_ENDPOINT,
    apiPort: process.env.FILE_API_PORT,
    jwtSecret: process.env.JWT_SECRET,
  },
  graphql: {
    apiUrl: 'http://graphql:5000', // when called from inside docker network
    apiEndpoint: '/graphql',
  },
  sentry: {
    organic_sentry_dsn: process.env.ORGANIC_SENTRY_DSN,
  },
}
