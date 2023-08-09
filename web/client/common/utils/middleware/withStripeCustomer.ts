import Stripe from 'stripe'
import { NextApiRequest, NextApiResponse } from 'next'

import { updateBillingProfile } from 'common/utils/gql'
import { validateBillingProfile } from 'common/utils/validate/validateBillingProfile'

import { AuthContext } from './graphqlAuth'
import { stripe } from '../stripeServer'

export interface StripeCustomerContext {
  customer: Stripe.Customer | Stripe.DeletedCustomer
  auth: AuthContext
}
export declare type CustomerApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  context: StripeCustomerContext,
) => void | Promise<void>

export const withStripeCustomer = (handler: CustomerApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
  auth: AuthContext,
) => {
  try {
    const { customerId, user, client } = auth

    // Initial creation of customer if not yet created
    if (!customerId) {
      try {
        const billingProfileId = validateBillingProfile(user)
        const customer = await stripe.customers.create({
          name: user.name,
          email: user.email,
          phone: user.phone || undefined,
          metadata: {
            userId: user.id,
            role: user.role,
            createdBy: 'client: withStripeCustomer middleware',
          },
        })
        await updateBillingProfile(client, {
          payload: {
            id: billingProfileId,
            patch: { customerId: customer.id },
          },
        })
        return handler(req, res, { auth, customer })
      } catch (error) {
        console.log('[ Create Stripe customer error ]', error.message)
        throw new Error('Cannot create Stripe customer')
      }
    }

    // Retrieve customer by id
    const customer = await stripe.customers.retrieve(customerId)
    if (!customer) {
      throw new Error('Customer not found')
    }
    return handler(req, res, { auth, customer })
  } catch (err) {
    console.error('[ withStripeCustomer ][ Error ]', err)
    return res.status(400).json({ statusCode: 400, message: err.message })
  }
}
