module.exports = {
  database: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    port: process.env.DB_PORT,
  },
  sentry: {
    organic_sentry_dsn: process.env.ORGANIC_SENTRY_DSN,
  },
}
