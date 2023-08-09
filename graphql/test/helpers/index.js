require('dotenv').config()
const path = require('path')

const test = (global.test = {})
const variables = (test.variables = Object.assign({}, process.env))

require(path.join(process.cwd(), 'shared/test/graphService'))
require(path.join(process.cwd(), 'shared/test/massiveJsService'))
require(path.join(process.cwd(), 'shared/test/fileService'))
require(path.join(process.cwd(), 'shared/test/customLog.func.js'))
require(path.join(process.cwd(), 'shared/test/testCredentials.js'))

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
})
