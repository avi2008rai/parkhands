const { Pool } = require('pg')
const dna = require('config')

module.exports = async ({ plasma }) => {
  const pgPool = new Pool({
    host: dna.get('database.host'),
    port: dna.get('database.port'),
    database: dna.get('database.name'),
    user: dna.get('database.user'),
    password: dna.get('database.password'),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    max: 10,
  })

  pgPool.connect((err, client, release) => {
    if (err) {
      return console.error(
        `An error occured while trying to connect to PostgreSQL database with the following credentials ${JSON.stringify(
          dna.get('database'),
        )}`,
        err,
      )
    }
    plasma.store({ type: 'pg-ready', pg: client })
    console.log(`| init | Connected to PostgreSQL database ${dna.get('database.name')}`)
  })
}
