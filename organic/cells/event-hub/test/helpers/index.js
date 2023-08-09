process.env.NODE_CONFIG_DIR = './dna'
const dna = require('config')
const path = require('path')

const test = (global.test = {})
test.variables = Object.assign({}, process.env)

let testEventHub = require(path.join(process.cwd(), 'index'))
test.plasma = testEventHub.plasma

// We run this test script inside docker container
// where graphql host name equals to graphql container name
test.variables.GRAPHQL_API_URL = dna.get('graphql.apiUrl')
test.variables.GRAPHQL_API_ENDPOINT = dna.get('graphql.apiEndpoint')
require(path.join(process.cwd(), 'shared/test/graphService'))
require(path.join(process.cwd(), 'shared/test/massiveJsService'))
require(path.join(process.cwd(), 'shared/test/pgService'))
require(path.join(process.cwd(), 'shared/test/testCredentials'))
require(path.join(process.cwd(), 'shared/test/customLog.func.js'))

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  // application specific logging, throwing an error, or other logic here
})
