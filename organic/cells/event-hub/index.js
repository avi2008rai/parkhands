// This tells the 'config' library to get it's config from the dna folder.
process.env.NODE_CONFIG_DIR = './dna'
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// Register ES6 modules
require('@babel/register')

// Load node-organic
const Cell = require('./load-organic').default

module.exports = new Cell()
