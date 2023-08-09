import Stripe from 'stripe'
import { NextApiResponse, NextApiRequest } from 'next'

import { stripe } from 'common/utils/stripeServer'
export { config } from 'common/utils/middleware/resolver'
import { post } from 'common/utils/middleware/restrictMethod'
import { graphqlAuth } from 'common/utils/middleware/graphqlAuth'
import {
  withStripeCustomer,
  StripeCustomerContext,
} from 'common/utils/middleware/withStripeCustomer'
import { validatePaymentMethod } from 'common/utils/validate/validatePaymentMethod'

export type PaymentMethodInput = {
  paymentMethodId: string
}
export type PaymentMethodDeleteResponse = {
  deleted?: true
  statusCode?: number
  message?: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PaymentMethodDeleteResponse>,
  { customer }: StripeCustomerContext,
) => {
  try {
    const { paymentMethodId } = req.body

    const paymentMethod = await validatePaymentMethod(paymentMethodId, { throwIfNotAttached: true })

    await stripe.paymentMethods.detach(paymentMethod.id)

    return res.status(200).json({ deleted: true })
  } catch (e) {
    console.error('[ Delete payment method error ]', e.message)
    return res.status(400).json({ statusCode: 400, message: e.message })
  }
}

export default post(graphqlAuth(withStripeCustomer(handler)))
