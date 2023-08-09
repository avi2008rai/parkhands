import _ from 'lodash'
import Stripe from 'stripe'
import { NextApiResponse, NextApiRequest } from 'next'

import { stripe } from 'common/utils/stripeServer'
export { config } from 'common/utils/middleware/resolver'
import { post } from 'common/utils/middleware/restrictMethod'
import { graphqlAuth, AuthContext } from 'common/utils/middleware/graphqlAuth'
import { validatePaymentMethod } from 'common/utils/validate/validatePaymentMethod'
import { validateBillingProfile } from 'common/utils/validate/validateBillingProfile'
import { updateBillingProfile } from 'common/utils/gql'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  { user, client }: AuthContext,
) => {
  const { priceId, paymentMethodId } = req.body
  try {
    if (!priceId) {
      throw new Error('Missing param: priceId')
    }

    validatePaymentMethod(paymentMethodId)
    const billingProfileId = validateBillingProfile(user)

    const customerId = user.billing_profile.customer_id
    let customer: Stripe.Customer | Stripe.DeletedCustomer | undefined
    if (customerId) {
      // Retrieve customer from ID
      customer = await stripe.customers.retrieve(customerId)
      // Attach payment method to customer
      await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id })
    } else {
      // Create customer
      customer = await stripe.customers.create({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        payment_method: paymentMethodId,
        invoice_settings: { default_payment_method: paymentMethodId },
      })

      // Store customerId to profile
      await updateBillingProfile(client, {
        payload: {
          id: billingProfileId,
          patch: {
            customerId: customer.id,
            customerObj: customer as any,
          },
        },
      })
    }

    if (!customer) {
      throw new Error('Invalid Stripe customer id')
    }

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      default_payment_method: paymentMethodId,
      expand: ['latest_invoice.payment_intent'],
    })
    console.error(`Subscription created:`, subscription)
    res.status(200).json({ subscription })
  } catch (e) {
    const statusCode = e.statusCode || 500
    console.error(`Subscription creation error:`, e)
    res.status(statusCode).json({ statusCode, message: e.message })
  }
}

export default post(graphqlAuth(handler))
