const loadSecret = require('./load-secret')

const secret = loadSecret()

module.exports = Object.assign(secret, {})
