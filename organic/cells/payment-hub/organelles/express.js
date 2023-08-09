const express = require('express')
const jwt = require('express-jwt')
const dna = require('config')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const stripe = require('stripe')(dna.get('stripe.secret_key'))
const endpointSecret = dna.get('stripe.webhook.secret')

module.exports = ({ plasma }) => {
  plasma.once(['pg-ready'], ({ pg }) => {
    const app = express()
    app.use(cors())
    app.use(morgan('combined', {
      skip: function (req, res) { return process.env.NODE_ENV == 'test' }
    }))
    app.use(helmet())

    //Verify request and
    app.post(dna.get('stripe.webhook.endpoint'), bodyParser.raw({type: 'application/json'}), (request, response) => {
      const sig = request.headers['stripe-signature']

      let event

      try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      }
      catch (err) {
        console.error(`Webhook Error: ${err.message}`)
        response.status(400).send(`Bad Request`);
      }

      if (dna.get('stripe.webhook.event_types').includes(event.type)) {
        plasma.emit({ type: `webhook-stripe`, event: event })
        console.info(`| stripe.webhook.${event.type} | stripe.event.id: ${event.id}`)
      }

      // Return a response to acknowledge receipt of the event
      response.json({received: true})
    })

    app.listen(dna.get('stripe.webhook.port'), () => {
      console.info(`| init | payment-hub listening @ ${dna.get('stripe.webhook.port')}!`)
      plasma.store({ type: 'express-ready', app: app})
    })
  })
}
