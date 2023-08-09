import { StripeElementStyle } from '@stripe/stripe-js'

import theme from 'common/theme'

// Custom styling can be passed to options when creating an Element.
export const stripeStyles: StripeElementStyle = {
  base: {
    color: theme.palette.secondary.main,
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '18px',
    '::placeholder': {
      color: '#aab7c4',
    },
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a',
  },
}