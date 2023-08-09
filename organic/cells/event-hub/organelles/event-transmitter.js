const dna = require('config')
const _ = require('lodash')

module.exports = async ({ plasma }) => {
  plasma.once(
    ['pg-ready', 'sentry-ready', 'services-ready'],
    ({ pg }, { sentryio }, { services }) => {
      let pgEvents = dna.get('pg_events')

      try {
        for (var key in pgEvents) {
          // Define listener for PG event
          pg.query('LISTEN "e:' + key + '"')

          // Invoke service handlers when plasma PG events are emitted
          plasma.once([`pg:e:${key}`], ({ event }) => {
            let event_key = event.channel.slice(2)
            let payload = JSON.parse(event.payload)

            let event_handlers = {}

            // Get only service handlers that include event_key
            for (let service_key in services) {
              _.filter(dna.get(`${service_key}.handlers`), function(h, handler_key) {
                if (_.includes(h.pg_events, event_key)) {
                  let handler = _.pick(h, ['queue'])
                  handler.pg_event_id = payload.pg_event_id
                  handler.event_key = event_key
                  handler.handler_key = handler_key
                  handler.service_key = service_key
                  handler.payload = payload
                  event_handlers[handler_key] = handler
                }
              })
            }

            // Emit plasma events when queue jobs are executed
            _.forEach(event_handlers, async function(handler, handler_key) {
              plasma.emit({ type: `queue:${handler_key}`, event: handler })
            })
          })
        }

        // Emit plasma events when PG events are executed
        pg.on('notification', async function(data) {
          plasma.emit({ type: `pg:${data.channel}`, event: data })
        })

        console.log(`| init | Server is ready to listen for database events!`)
        plasma.store({ type: 'event-transmitter-ready' })
      } catch (err) {
        console.error('---- ERROR ---- \r\n', err)
        sentryio.capture(err)
        return
      }
    },
  )
}
