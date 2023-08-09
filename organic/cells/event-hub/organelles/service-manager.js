import _ from 'lodash'
import dna from 'config'

export default ({ plasma }) => {
  plasma.once(['queue-ready', 'sentry-ready'], ({ queue }, { sentryio }) => {
    let service_names = dna.get('enabled_services')
    let services = []
    for (let service_key of service_names) {
      const service = require(`${process.cwd()}/services/${service_key}/index.js`).default
      services[service_key] = service({ plasma })

      _.forEach(dna.get(`${service_key}.handlers`), async function (handler, handler_key) {
        let subscribe_options = Object.assign(
          _.clone(dna.get('queue.subscribe')),
          _.clone(handler.queue.subscribe),
        )
        await queue.subscribe(handler_key, subscribe_options, handlerDispatcher)

        await queue.onComplete(handler_key, (job) => {
          console.log(
            `| queue | Completed job '${handler_key}' with id '${job.data.request.id}' and response:`,
          )
          //console.log(job.data.response)
        })

        // Invoke service handlers when plasma QUEUE events are emitted
        plasma.once([`queue:${handler_key}`], async ({ event }) => {
          if (process.env.NODE_ENV === 'test') return

          let publish_options = Object.assign(
            _.clone(dna.get('queue.publish')),
            _.clone(event.queue.publish),
          )
          // Add this handler to queue
          let jobId = await queue.publish(event.handler_key, { event: event }, publish_options)
          console.log(`| queue | Created job in channel '${event.handler_key}': ${jobId}`)
        })
      })
    }

    async function handlerDispatcher(job) {
      console.log(`| queue | Dispatched job '${job.id}'`)
      try {
        // Execute service handler request
        const service = services[job.data.event.service_key]
        return await service.request(job.data.event)
      } catch (err) {
        console.error('---- ERROR ---- \r\n', err)
        sentryio.capture(err)
        return
      }
    }

    plasma.store({ type: 'services-ready', services: services })
  })
}
