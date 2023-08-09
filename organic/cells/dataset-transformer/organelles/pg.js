const pg = require('pg')
const dna = require('config')

module.exports = async ({ plasma }) => {
  var pgConnUri =
    'postgres://' +
    dna.get('database.user') +
    ':' +
    dna.get('database.password') +
    '@' +
    dna.get('database.host') +
    ':' +
    dna.get('database.port') +
    '/' +
    dna.get('database.name')
  const pgClient = new pg.Client(pgConnUri)

  try {
    pgClient.connect(function() {
      plasma.store({ type: 'pg-ready', pg: pgClient })
      console.log(`| init | Connected to PostgreSQL database ${dna.get('database.name')}`)
    })
  } catch (err) {
    console.error(
      `An error occured while trying to connect to PostgreSQL database with the following credentials ${JSON.stringify(
        dna.get('database'),
      )}`,
      err,
    )
  }
}
