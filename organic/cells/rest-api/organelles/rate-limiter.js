const dna = require('config')
const createRateLimiter = require('lib/create-rate-limiter')

module.exports = ({ plasma }) => {
  plasma.once(['pg-ready'], ({ pg }) => {
    const opts = {
      storeClient: pg,
      points: dna.get('rateLimiter.points'), // Number of points
      duration: dna.get('rateLimiter.duration'), // Per second(s)
      clearExpiredByTimeout: false,

      // Custom options
      tableName: 'private.api_usage', // if not provided, keyPrefix used as table name
      keyPrefix: '', // must be unique for limiters with different purpose
    }

    createRateLimiter(opts)
      .then((rateLimiter) => {
        plasma.store({ type: 'rate-limiter-ready', rateLimiter: rateLimiter })
      })
      .catch((err) => {
        console.error(err)
        process.exit()
      })
  })
}
