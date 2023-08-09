import Stripe from 'stripe'
import { stripe } from 'common/utils/stripeServer'

type ValidateOptions = {
  throwIfAttached?: boolean
  throwIfNotAttached?: boolean
}
export const validatePaymentMethod = async (
  paymentMethodId?: string,
  options: ValidateOptions = {
    throwIfAttached: true,
    throwIfNotAttached: false,
  },
): Promise<Stripe.PaymentMethod> => {
  if (!paymentMethodId) {
    throw new Error('Missing param: paymentMethodId')
  }
  const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)
  if (!paymentMethod) {
    throw new Error('Invalid payment method')
  }
  if (options.throwIfAttached && paymentMethod.customer) {
    throw new Error('Payment method is already attached to a customer')
  }
  if (options.throwIfNotAttached && !paymentMethod.customer) {
    throw new Error('Payment method should be attached to a customer')
  }
  return paymentMethod
}
