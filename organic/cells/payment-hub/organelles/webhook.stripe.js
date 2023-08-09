const dna = require('config')
const _ = require('lodash')
const util = require('util')

module.exports = async ({ plasma }) => {
  plasma.once(['pg-ready', 'sentry-ready', 'webhook-stripe'],
    async ({ pg }, { sentryio }, {event}) => {
      try {
        console.log(event)
        await pg.query(
          `
            INSERT INTO private.stripe_webhook
              (id,customer,type,payload)
            VALUES
              ($1,$2,$3,$4);
          `,
          [event.id, event.data.object.customer, event.type, event],
        )
      } catch (error) {
        // sentry.captureError(error)
        console.error(error)
      }
    }
  )
}
