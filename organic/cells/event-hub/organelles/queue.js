const PgBoss = require('pg-boss')
const dna = require('config')

module.exports = async ({ plasma }) => {
  const options = {
    host: dna.get('database.host'),
    database: dna.get('database.name'),
    user: dna.get('database.user'),
    password: dna.get('database.password'),
    port: dna.get('database.port'),
    poolSize: dna.get('queue.config.poolSize'),
    monitorStateIntervalMinutes: dna.get('queue.config.monitorStateIntervalMinutes'),
    maintenanceIntervalMinutes: dna.get('queue.config.maintenanceIntervalMinutes'),
    newJobCheckIntervalSeconds: dna.get('queue.config.newJobCheckIntervalSeconds'),
  }

  const boss = new PgBoss(options)

  try {
    boss.on('error', error => console.error(error))
    boss.on('monitor-states', data => console.log(data))

    // Give time for db migrations to insert uuid extension on clean-db start
    await sleep(10000)
    await boss.start()
    console.log(
      `| init | Connected to PgBoss message queue on database: ${dna.get('database.name')}`,
    )
  } catch (err) {
    console.error(
      `An error occured while trying to connect to PostgreSQL database with the following credentials ${JSON.stringify(
        dna.get('database'),
      )}`,
      err,
    )
  }

  plasma.store({ type: 'queue-ready', queue: boss })

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
