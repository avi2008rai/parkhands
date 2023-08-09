import Stripe from 'stripe'
import { NextApiResponse, NextApiRequest } from 'next'

import { stripe } from 'common/utils/stripeServer'
export { config } from 'common/utils/middleware/resolver'
import { get } from 'common/utils/middleware/restrictMethod'
import { graphqlAuth } from 'common/utils/middleware/graphqlAuth'
import {
  withStripeCustomer,
  StripeCustomerContext,
} from 'common/utils/middleware/withStripeCustomer'

export type PaymentMethodListResponse = {
  count?: number
  preSelected?: string | null
  cards?: Stripe.PaymentMethod[]
  sepaDebits?: Stripe.PaymentMethod[]
  // Error
  statusCode?: number
  message?: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PaymentMethodListResponse>,
  { customer }: StripeCustomerContext,
) => {
  try {
    const cards = await stripe.paymentMethods.list({
      customer: customer.id,
      type: 'card',
    })
    const sepaDebits = await stripe.paymentMethods.list({
      customer: customer.id,
      type: 'sepa_debit',
    })

    const all = [...cards.data, ...sepaDebits.data]
    return res.status(200).json({
      count: all.length,
      preSelected: all.length >= 1 ? all[0].id : null,
      cards: cards.data,
      sepaDebits: sepaDebits.data,
    })
  } catch (e) {
    console.error('[ List payment methods error ]', e.message)
    return res.status(400).json({ statusCode: 400, message: e.message })
  }
}

export default get(graphqlAuth(withStripeCustomer(handler)))
