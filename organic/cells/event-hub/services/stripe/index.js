import path from 'path'
import dna from 'config'
import Stripe from 'stripe'

import loader from 'lib/loader'

const moduleHolder = {}

class StripeApi {
  constructor({ plasma }) {
    this.stripe = null
    plasma.once(['pg-ready'], ({ pg }) => {
      this.pgClient = pg
    })
    loader(path.join(__dirname, 'handlers'), moduleHolder)
  }

  connect() {
    // Create Stripe api client
    this.stripe = Stripe(dna.get('stripe.secret_key'))
  }

  async request(event) {
    // dynamically invoke event
    const eventHandler = moduleHolder[event.handler_key]
    return await eventHandler(this.stripe, event, this.pgClient)
  }
}

export default ({ plasma }) => {
  const stripe = new StripeApi({ plasma })
  stripe.connect()
  plasma.store({ type: 'stripe-ready', stripe })
  return stripe
}
