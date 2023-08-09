module.exports = function loadSecret() {
  let secret

  try {
    secret = require('./secret')
  } catch (error) {
    secret = {}
  }

  if (Object.keys(secret).length === 0) {
    console.warn('[Warning] Loading DNA without secret may cause unexpected behaviour')
  }

  return secret
}
