const swagger = require("swagger-generator-express")
const dna = require('config')
const packageJson = require('../../../package.json')

const swaggerGen = (app) => {
  // Swagger
  const options = {
  	title: "Parkhands REST API",
  	version: packageJson.version,
  	host: dna.get('rest.apiUrl').replace(/(^\w+:|^)\/\//, ''),
  	basePath: "/",
  	schemes: [dna.get('rest.apiProtocol')],
  	contact: {
      name: 'Parkhands TEAM',
      url: 'http://www.parkhands.com',
      email: 'support@parkhands.com'
    },
    consumes: ['application/json'],
    produces: ['application/json'],
  	securityDefinitions: {
  		ApiKeyAuth: {
  			description: 'Generate your API KEY from interface or contact our team for help.',
  			type: 'apiKey',
  			name: 'X-API-KEY',
  			in: 'header'
  		}
  	},
  	security: [{ApiKeyAuth: []}],
  	defaultSecurity: 'ApiKeyAuth',
    swaggerOptions: {
      defaultModelsExpandDepth: "-1",
    },
  }

  // with requestModels and responseModels
  swagger.serveSwagger(app, `${dna.get('rest.apiEndpoint')}/api-docs`, options, {routePath : './routes/', requestModelPath: './api-docs/requestModels/', responseModelPath: './api-docs/responseModels/'})
  // without requestModels and responseModels
  //swagger.serveSwagger(app, `${dna.get('rest.apiEndpoint')}/api-docs`, options, {routePath : './routes/'})
}

module.exports = swaggerGen
