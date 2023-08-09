var fs = require('fs')
const path = require('path')

test.pgService = {
  connect: async () => {
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
  },
  // Truncate/reinsert defined data
  reset: async () => {
    let reset_scripts = [
      'reset/reset.sql',
      'test_data/test_data_user.sql',
      'test_data/test_data_slot.sql',
      'test_data/test_data_slot_amenity.sql',
      'test_data/test_data_slot_availability.sql',
      'test_data/test_data_slot_booking.sql',
    ]

    for (const script of reset_scripts) {
      try {
        let sql = fs.readFileSync(path.join(process.cwd(), 'shared/db/' + script)).toString()
        // execute sql
        await test.pg.query(sql)
      } catch (err) {
        console.log(err);
      }
    }
  }
}
