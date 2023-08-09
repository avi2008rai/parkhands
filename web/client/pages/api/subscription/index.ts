import { NextApiResponse, NextApiRequest } from 'next'

import { stripe } from 'common/utils/stripeServer'
import { get } from 'common/utils/middleware/restrictMethod'
export { config } from 'common/utils/middleware/resolver'
import { graphqlAuth, AuthContext } from 'common/utils/middleware/graphqlAuth'
import {
  withStripeCustomer,
  StripeCustomerContext,
} from 'common/utils/middleware/withStripeCustomer'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  { customer }: StripeCustomerContext,
) => {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      expand: ['data.latest_invoice'],
    })
    res.status(200).json(subscriptions)
  } catch (e) {
    console.error(`Subscriptions list error: ${e.message}`)
    res.status(500).json({ statusCode: 500, message: e.message })
  }
}

export default get(graphqlAuth(withStripeCustomer(handler)))
