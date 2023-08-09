import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { PickArrayType } from 'gql/schema'
import DotMenu from 'components/common/DotMenu'
import CreditCardIcon from 'components/common/icon/CreditCardIcon'
import { PaymentMethodListResponse } from 'pages/api/payment-method/list'

import DeletePaymentMethodButton from './DeletePaymentMethodButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    cc: {
      overflow: 'hidden',
      letterSpacing: theme.spacing(0.35),
      [theme.breakpoints.only('xs')]: {
        fontSize: theme.typography.pxToRem(12),
      },
    },
    expiry: {
      [theme.breakpoints.only('xs')]: {
        fontSize: theme.typography.pxToRem(12),
      },
    },
  }),
)

type PaymentMethodRowProps = {
  paymentMethod: PickArrayType<PaymentMethodListResponse['cards']>
  onDelete?: () => void
}
export default function PaymentMethodCard({ paymentMethod, onDelete }: PaymentMethodRowProps) {
  const classes = useStyles()
  if (paymentMethod.type !== 'card') {
    return null
  }
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={2} sm={1}>
        <Box textAlign="center">
          <CreditCardIcon color="secondary" />
        </Box>
      </Grid>
      <Grid item xs={7} sm={8}>
        <Typography variant="subtitle2" className={classes.cc}>
          {`**** **** **** ${paymentMethod.card?.last4}`}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="subtitle2" align="center" className={classes.expiry}>
          {paymentMethod.card?.exp_month} / {`${paymentMethod.card?.exp_year}`.slice(2)}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Box textAlign="center">
          <DotMenu>
            <DeletePaymentMethodButton paymentMethodId={paymentMethod.id} onDelete={onDelete} />
          </DotMenu>
        </Box>
      </Grid>
    </Grid>
  )
}
