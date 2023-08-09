const Sentry = require('@sentry/node')
const dna = require('config')

module.exports = ({ plasma }) => {
  Sentry.init({
    dsn: dna.get('sentry.organic_sentry_dsn'),
    logger: process.env.NODE_ENV,
  })
  const sentryio = {
    capture: function(err) {
      Sentry.captureException(err)
    },
  }
  plasma.store({ type: 'sentry-ready', sentryio: sentryio })
}
