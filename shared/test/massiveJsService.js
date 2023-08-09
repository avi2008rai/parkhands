const massive = require('massive')

test.dbService = {
  // Connect to massive.js
  connect: async () => {
    try {
      if (!test.db) {
        test.db = await massive({
          host: process.env.DB_HOST,
          port: 5432,
          database: process.env.DB_NAME,
          user: process.env.POSTGRESQL_USERNAME,
          password: process.env.POSTGRESQL_PASSWORD,
        }, {
          scripts: process.cwd() + '/shared/db'
        })
      }
    } catch(e) {
        console.log(e)
    }
  },

  // Truncate/reinsert defined data
  reset: async () => {
    if (!test.db) {
      await test.dbService.connect()
    }

    await test.db.reset.reset()

    await test.db.test_data.test_data_user()
    await test.db.test_data.test_data_slot()
    await test.db.test_data.test_data_slot_amenity()
    await test.db.test_data.test_data_slot_availability()
    await test.db.test_data.test_data_slot_booking()
  }
}
