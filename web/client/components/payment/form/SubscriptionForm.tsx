import getConfig from 'next/config'
import React, { useState, useRef } from 'react'
import { Grid, TextField, Box, Typography, LinearProgress } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import { useUser } from 'components/hooks/useUser'
import { useFetch } from 'components/hooks/useFetch'
import LoadStripe from 'components/payment/LoadStripe'
import useFormError from 'components/hooks/useFormError'
import { stripeStyles } from 'common/utils/stripeStyles'
import { usePageProps } from 'components/hooks/usePageProps'
import SubmitButton from 'components/common/form/SubmitButton'
import { PageParams } from 'components/payment/SubscriptionPage'

const {
  publicRuntimeConfig: { premiumSubscription },
} = getConfig()

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardElement: {
      borderRadius: theme.shape.borderRadius,
      borderColor: 'rgba(255, 255, 255, 0.23)',
      padding: '1rem',
      borderStyle: 'solid',
      borderWidth: 1,
      '&:hover': {
        borderColor: theme.palette.text.primary,
      },
      color: theme.palette.secondary.main,
    },
    subscribeBtn: {
      textTransform: 'uppercase',
    },
    progress: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  }),
)

type SubscriptionFormProps = {
  onSubscriptionSuccess?: () => void
}

function StripeSubscriptionForm({ onSubscriptionSuccess }: SubscriptionFormProps) {
  const { user } = useUser()
  const stripe = useStripe()
  const classes = useStyles()
  const elements = useElements()
  const cardHolder = useRef<HTMLInputElement>()
  const [loading, setLoading] = useState(false)
  const { FormError, setError } = useFormError()
  const [createSubscription] = useFetch({ method: 'POST', baseUrl: '/api/subscription/create' })
  const {
    props: { plan },
  } = usePageProps<PageParams>()

  // Handle form submission.
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      setLoading(true)
      const cardElement = elements?.getElement(CardElement)
      if (!cardElement) {
        throw new Error('processing_error')
      }

      // const customer = await stripe.customers.create()
      const payload = await stripe?.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          email: user.email,
          name: cardHolder.current?.value || user.name,
          phone: user.phone || undefined,
        },
        metadata: {
          userId: user.id || null,
        },
      })

      if (payload?.error?.message) {
        console.log('[stripe-error]', payload.error)
        throw new Error(payload.error.message)
      }

      if (!payload?.paymentMethod?.id) {
        throw new Error('error_cannot_process_method')
      }

      // Send request to create a subscription
      const response = await createSubscription({
        body: {
          priceId: premiumSubscription.priceId,
          paymentMethodId: payload.paymentMethod.id,
        },
      })

      // Proceed with update of the UI
      if (response?.status === 200 && typeof onSubscriptionSuccess === 'function') {
        return onSubscriptionSuccess()
      }

      throw new Error('processing_error')
    } catch (error) {
      console.log('[subscription-error]', error.message)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" justify="center">
        <Grid item>
          <Typography display="inline" variant="h4">
            &euro;
          </Typography>
          <Box display="inline" p={1}>
            <Typography display="inline" variant="h1" align="center">
              {plan.unitAmount}
            </Typography>
          </Box>
          <Typography display="inline" variant="h4">
            / mo
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            size="medium"
            name="cardHolder"
            variant="outlined"
            label="name_on_card"
            disabled={loading}
            inputRef={cardHolder}
            defaultValue={user.name}
          />
        </Grid>
        <Grid item>
          <CardElement
            id="card"
            className={classes.cardElement}
            options={{ style: stripeStyles, hidePostalCode: true }}
          />
        </Grid>
        <Grid item>
          <FormError />
        </Grid>
        <Grid item>
          <Box textAlign="center" my={2}>
            <SubmitButton
              label="Subscribe"
              color="secondary"
              disabled={loading}
              classes={{ label: classes.subscribeBtn }}
            />
          </Box>
        </Grid>
      </Grid>
      {/* <pre>{JSON.stringify(settings, null, 2)}</pre> */}
      {loading && <LinearProgress className={classes.progress} variant="indeterminate" />}
    </form>
  )
}

export default function SubscriptionForm(props: SubscriptionFormProps) {
  return (
    <LoadStripe>
      <StripeSubscriptionForm {...props} />
    </LoadStripe>
  )
}
