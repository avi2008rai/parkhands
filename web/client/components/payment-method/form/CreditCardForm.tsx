import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { Check } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { useForm, FormContext } from 'react-hook-form'
import { Box, CircularProgress, Grid, IconButton, Snackbar } from '@material-ui/core'

import { Domain } from 'common/i18n'
import FormAlert from 'components/alert/FormAlert'
import { useUser } from 'components/hooks/useUser'
import { useFetch } from 'components/hooks/useFetch'
import { stripeStyles } from 'common/utils/stripeStyles'
import useFormError from 'components/hooks/useFormError'
import ConsentCheckbox from 'components/privacy/ConsentCheckbox'
import NameController from 'components/form/controller/NameController'
import { PaymentMethodCreateResponse, PaymentMethodInput } from 'pages/api/payment-method/create'

import { schemaCreate } from './validation'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    saveIcon: {
      boxShadow: theme.shadows[3],
    },
    cardElement: {
      borderRadius: theme.shape.borderRadius,
      borderColor: 'rgba(255, 255, 255, 0.23)',
      padding: theme.spacing(1.125),
      borderStyle: 'solid',
      borderWidth: 1,
      '&:hover': {
        borderColor: theme.palette.text.primary,
      },
      color: theme.palette.secondary.main,
    },
  }),
)
type PaymentMethod = {
  name: string
  paymentMethodId: string
  acceptedTerms: boolean
}
export type CreditCardFormProps = {
  onCreate?: (paymentMethodId: string) => void
  onFormSuccess?: () => void
}
export default function CreditCardForm({ onFormSuccess, onCreate }: CreditCardFormProps) {
  const { t } = useTranslation(Domain.Pages)
  const classes = useStyles()
  const { user } = useUser()
  const stripe = useStripe()
  const elements = useElements()
  const cardHolder = useRef<HTMLInputElement>(null)

  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [loading, setFormLoading] = useState(false)
  const { FormError, setError, resetError } = useFormError()
  const [storeMethod, { cancel }] = useFetch<PaymentMethodCreateResponse, PaymentMethodInput>({
    method: 'POST',
    baseUrl: '/api/payment-method/create',
    throwErrors: true,
  })
  const methods = useForm<PaymentMethod>({
    mode: 'onChange',
    defaultValues: {
      name: user.name || '',
      paymentMethodId: '',
      acceptedTerms: false,
    },
    validationSchema: schemaCreate,
  })
  const { handleSubmit, errors } = methods
  const closeAlertHandler = () => setShowAlert(false)

  useEffect(() => {
    return () => cancel()
  }, [cancel])

  useEffect(() => {
    if (errors.acceptedTerms) {
      setError('error_terms_conditions', 'warning')
    } else {
      resetError()
    }
  }, [errors.acceptedTerms])

  const onSubmitHandler = handleSubmit(async (values, event) => {
    event?.preventDefault()
    resetError()
    setFormLoading(true)
    try {
      // Paid booking
      const cardElement = elements?.getElement(CardElement)
      if (!cardElement) {
        throw new Error('processing_error')
      }

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
        throw new Error(payload.error.message)
      }

      if (payload?.paymentMethod?.id) {
        await storeMethod({
          body: { paymentMethodId: payload.paymentMethod.id },
        })
        if (typeof onCreate === 'function') {
          onCreate(payload.paymentMethod.id)
        }
      }
      if (typeof onFormSuccess === 'function') {
        onFormSuccess()
      }
      setFormLoading(false)
    } catch (error) {
      console.error(error)
      setError(error.message)
      setFormLoading(false)
    }
  })
  return (
    <FormContext {...methods}>
      <form onSubmit={onSubmitHandler} method="POST" encType="multipart/form-data">
        <Grid container direction="column" justify="space-evenly">
          <Grid item xs={12}>
            <NameController
              autoFocus
              disabled={loading}
              inputRef={cardHolder}
              label={t('name_on_card')}
            />
          </Grid>
          <Grid item xs={12}>
            <CardElement
              id="card"
              className={classes.cardElement}
              options={{
                style: stripeStyles,
                hidePostalCode: true,
                disabled: loading,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <ConsentCheckbox />
            {/* {!_.isEmpty(watch()) && <pre>{JSON.stringify(watch(), null, 2)}</pre>} */}
            {/* {!_.isEmpty(errors) && <pre>{JSON.stringify(errors, null, 2)}</pre>} */}
          </Grid>
          <Grid item xs={12}>
            <FormError />
          </Grid>
          <Grid item xs={12}>
            <Box width="100%" textAlign="center" pt={1}>
              <IconButton
                disabled={loading}
                type="submit"
                className={classes.saveIcon}
                color={'secondary'}>
                {loading ? (
                  <CircularProgress variant="indeterminate" color="secondary" size="1.5rem" />
                ) : (
                  <Check />
                )}
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Snackbar open={showAlert} autoHideDuration={2000} onClose={closeAlertHandler}>
          <FormAlert
            show={showAlert}
            alertProps={{ severity: 'success', onClose: closeAlertHandler }}>
            {t('payment_method_created')}
          </FormAlert>
        </Snackbar>
      </form>
    </FormContext>
  )
}
