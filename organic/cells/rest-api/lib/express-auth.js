const dna = require('config')

const expressAuth = (pg, rateLimiter) => {
  return function (req, res, next) {
    if ( req.url.includes(`${dna.get('rest.apiEndpoint')}/api-docs`)) {
      next()
    } else {
      const api_key = req.headers['x-api-key']
      if (api_key) {
        // perform `authenticate_api` using api_key
        // it responds with jwt for further authentication over graphql api
        const sql = `SELECT * FROM api.authenticate_api($1)`
        const params = [api_key]
        pg.query(sql, params, (err, result) => {
          if (err) {
            res.status(401).send({ error: err.toString()})
          } else {
            let row = result.rows[0]
            req.headers['authorization'] = `Bearer ${row.authenticate_api.token}`
            req.user = row.authenticate_api.user
            // Set Rate limiter per user_id
            rateLimiter.consume(req.user.id, 1) // Consume 1 point per request
              .then((rateLimiterRes) => {
                // There were enough points to consume
                next()
              })
              .catch((rateLimiterRes) => {
                // Not enough points to consume
                console.log(rateLimiterRes)
                res.status(429).send({ error: 'Quota limit exceeded' })
              })
          }
        })
      } else {
        res.status(401).send({ error: 'Authentication required' })
      }
    }
  }
}

module.exports = expressAuth
