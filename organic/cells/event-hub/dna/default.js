module.exports = {
  database: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    port: process.env.DB_PORT,
  },
  graphql: {
    apiUrl: 'http://graphql:5000', // when called from inside docker network
    apiEndpoint: process.env.GRAPHQL_API_ENDPOINT,
  },
  queue: {
    config: {
      poolSize: 10, // Maximum number of connections that will be shared by all subscriptions in this instance
      monitorStateIntervalMinutes: 60,
      maintenanceIntervalMinutes: 10,
      newJobCheckIntervalSeconds: 5, // interval to check for new jobs in seconds.
      archiveIntervalDays: '7',
      deleteIntervalDays: '90',
    },
    publish: {
      priority: 0, // Higher numbers have higher priority
      startAfter: 0, // Seconds to delay starting the job
      retryLimit: 5, // Max number of retries of failed jobs.
      retryDelay: 60, // Delay between retries of failed jobs, in seconds.
      expireInMinutes: '15',
    },
    subscribe: {
      teamSize: 5, // How many jobs can be fetched per polling interval.
      teamConcurrency: 5, // How many callbacks will be called concurrently if promises are used for polling backpressure.
      newJobCheckIntervalSeconds: 5, // interval to check for new jobs in seconds.
    },
  },
  enabled_services: ['sendgrid', 'stripe'],
  pg_events: {
    'user.insert': {
      title: 'Admin created new user',
    },
    'user.forgot_password': {
      title: 'User requested password change',
    },
    'user.resend_activation_email': {
      title: 'Resend users activation email',
    },
    'user.cancel_subscriptions': {
      title: 'User has been soft deleted',
    },
  },
  sendgrid: {
    from_addr: process.env.SENDGRID_FROM_ADDR,
    api_key: process.env.SENDGRID_API_KEY,
    send_from_dev: process.env.SENDGRID_SEND_DEV || false,
    handlers: {
      sendgrid_send_email: {
        title: 'Send email using SendGrid',
        pg_events: ['user.insert', 'user.forgot_password', 'user.resend_activation_email'],
        queue: {
          publish: {
            priority: 1,
          },
        },
      },
    },
  },
  stripe: {
    secret_key: process.env.STRIPE_SECRET_KEY,
    handlers: {
      stripe_customer: {
        title: 'Create Stripe Customer',
        pg_events: ['user.insert'],
        queue: {
          publish: {
            priority: 1,
          },
        },
      },
      cancel_subscriptions: {
        secret_key: process.env.STRIPE_SECRET_KEY,
        title: 'Cnacel users subscriptions in Stripe',
        pg_events: ['user.cancel_subscriptions'],
        queue: {
          publish: {
            priority: 1,
          },
        },
      },
    },
  },
  sentry: {
    organic_sentry_dsn: process.env.ORGANIC_SENTRY_DSN,
  },
}
