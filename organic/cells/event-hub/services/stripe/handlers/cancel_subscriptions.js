const dna = require('config')
const _ = require('lodash')

async function handler(stripe, event, pg) {
  const { payload, event_key } = event
  const { user } = payload

  _.forEach(payload.stripe_subs, async (sub) => {
    await stripe.subscriptions.del(
      sub.plan_subscription_id,
      async function(err, confirmation) {
        if (err) {
          console.error(err)
          return
        }
        console.log(`Stripe sub deleted: ${confirmation.id}`)
      }
    );
  })
}

export default function (moduleHolder) {
  moduleHolder['cancel_subscriptions'] = handler
}
