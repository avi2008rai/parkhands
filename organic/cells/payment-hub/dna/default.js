module.exports = {
  database: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    port: process.env.DB_PORT
  },
  stripe: {
    secret_key: process.env.STRIPE_SECRET_KEY,
    webhook: {
      endpoint: process.env.STRIPE_WEBHOOK_ENDPOINT,
      port: process.env.STRIPE_WEBHOOK_PORT,
      secret: process.env.STRIPE_WEBHOOK_SECRET,
      event_types: [
        'customer.subscription.created',
        'customer.subscription.deleted',
        'customer.subscription.updated',
        'customer.subscription.pending_update_applied',
        'customer.subscription.pending_update_expired',
        'customer.subscription.trial_will_end'
      ]
    }
  },
  sentry: {
    organic_sentry_dsn: process.env.ORGANIC_SENTRY_DSN
  },
}
