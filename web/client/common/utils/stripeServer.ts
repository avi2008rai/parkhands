import Stripe from 'stripe'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()
export const stripe = new Stripe(serverRuntimeConfig.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
})

// Register response log
stripe.on('response', (event: Stripe.ResponseEvent) => {
  console.log(`[ Stripe ][ Request ][ ${event.method} ][ ${event.elapsed / 1000}s ] ${event.path}`)
})
