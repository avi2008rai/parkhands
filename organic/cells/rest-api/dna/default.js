module.exports = {
  database: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    port: process.env.DB_PORT,
  },
  rest: {
    apiUrl: process.env.REST_API_URL,
    apiEndpoint: process.env.REST_API_ENDPOINT,
    apiPort: process.env.REST_API_PORT,
    apiProtocol: process.env.REST_API_PROTOCOL,
    jwtSecret: process.env.JWT_SECRET,
  },
  graphql: {
    apiUrl: 'http://graphql:5000', // when called from inside docker network
    apiEndpoint: '/graphql',
  },
  rateLimiter: {
    points: 10000, // Points to consume for duration
    duration: 3600, // in seconds
  },
  sentry: {
    organic_sentry_dsn: process.env.ORGANIC_SENTRY_DSN,
  },
}
