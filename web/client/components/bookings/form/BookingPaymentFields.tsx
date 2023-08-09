import React, { forwardRef, Ref } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { CardElement } from '@stripe/react-stripe-js'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

import { stripeStyles } from 'common/utils/stripeStyles'
import { useUser } from 'components/hooks/useUser'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

type BookingPaymentFieldsParams = {
  loading: boolean
}

function BookingPaymentFields({ loading }: BookingPaymentFieldsParams, ref: Ref<HTMLInputElement>) {
  const classes = useStyles()
  const { user } = useUser()

  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          size="medium"
          name="cardHolder"
          variant="outlined"
          label="name_on_card"
          margin="dense"
          disabled={loading}
          inputRef={ref}
          defaultValue={user.name}
        />
      </Grid>
      <Grid item xs={12}>
        <CardElement
          id="card"
          className={classes.cardElement}
          options={{ style: stripeStyles, hidePostalCode: true }}
        />
      </Grid>
    </>
  )
}

export default forwardRef<HTMLInputElement, BookingPaymentFieldsParams>(BookingPaymentFields)
