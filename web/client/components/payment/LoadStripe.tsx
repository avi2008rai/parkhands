import getConfig from 'next/config'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import i18n from 'common/i18n'
import { AvailableLocales } from 'common/i18n/locale'

const {
  publicRuntimeConfig: { premiumSubscription },
} = getConfig()

// Setup Stripe.js and the Elements provider
// Make sure to call `loadStripe` outside of a components render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(premiumSubscription.publicKey, {
  locale: i18n.language as AvailableLocales,
})

export default function LoadStripe({ children }: React.PropsWithChildren<{}>) {
  return <Elements stripe={stripePromise}>{children}</Elements>
}
