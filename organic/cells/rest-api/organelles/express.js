const express = require('express')
const expressAuth = require('lib/express-auth')
const swaggerGen = require('lib/swagger-gen')
const dna = require('config')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const listRESTEndpoints = require('express-list-endpoints')

// Routes
var amenities = require('routes/amenities')
var slots = require('routes/slots')
var vehicleSizes = require('routes/vehicleSizes')
var users = require('routes/users')

module.exports = ({ plasma }) => {
  plasma.once(['pg-ready', 'rate-limiter-ready'], ({ pg }, { rateLimiter }) => {
    const app = express()
    app.use(cors())
    app.use(expressAuth(pg, rateLimiter))
    app.use(morgan('combined', {
      skip: function (req, res) { return process.env.NODE_ENV == 'test' }
    }))
    app.use(helmet())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    // override swagger ui css to place custom logo
    app.get(dna.get('rest.apiEndpoint') + '/api-docs/swagger-ui.css', function(req, res) {
      res.sendFile('swagger-ui.css', { root: 'static'})
    })

    // Define routes
    app.use(dna.get('rest.apiEndpoint'), amenities)
    app.use(dna.get('rest.apiEndpoint'), slots)
    app.use(dna.get('rest.apiEndpoint'), vehicleSizes)
    app.use(dna.get('rest.apiEndpoint'), users)

    // Invoke swagger after routes are defined
    swaggerGen(app)

    // Default error handler
    app.use(function (err, req, res, next) {
      let statusCode = err.status || 500
      // override error message and statusCode in case permission denied exist in error message
      if (err.response !== undefined && err.response.errors[0].code == '42501') {
        res.status(401).json({
    			error: 'Authentication required'
    		})
      }
      // override error message and statusCode in case validation error exist
      else if (err.errors != undefined && err.name == 'ValidationError' && err.errors[0].messages[0]) {
        res.status(statusCode).json({
    			error: err.errors[0].messages[0]
    		})
      } else {
        // enable log for debugging
        //console.log(err);
        res.status(statusCode).json({
    			error: err.response.errors[0].message
    		})
      }
    })

    app.listen(dna.get('rest.apiPort'), () => {
      console.log(`| init | Express rest-api listening on port ${dna.get('rest.apiPort')}!`)
      console.log(`| init | Swagger UI can be found on ${dna.get('rest.apiUrl')}${dna.get('rest.apiEndpoint')}/api-docs`)
      console.log(listRESTEndpoints(app)) // debug only
      plasma.store({ type: 'express-ready', app: app})
    })
  })
}
