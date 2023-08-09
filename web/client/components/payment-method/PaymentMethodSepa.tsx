import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { PickArrayType } from 'gql/schema'
import DotMenu from 'components/common/DotMenu'
import SepaIcon from 'components/common/icon/SepaIcon'
import { PaymentMethodListResponse } from 'pages/api/payment-method/list'

import DeletePaymentMethodButton from './DeletePaymentMethodButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    iban: {
      overflow: 'hidden',
      letterSpacing: theme.spacing(0.35),
      [theme.breakpoints.only('xs')]: {
        fontSize: theme.typography.pxToRem(12),
      },
    },
    bankCode: {
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
export default function PaymentMethodSepa({ paymentMethod, onDelete }: PaymentMethodRowProps) {
  const classes = useStyles()
  if (paymentMethod.type !== 'sepa_debit') {
    return null
  }
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={2} sm={1}>
        <Box textAlign="center">
          <SepaIcon fontSize="large" color="secondary" />
        </Box>
      </Grid>
      <Grid item xs={7} sm={8}>
        <Typography variant="subtitle2" className={classes.iban}>
          {`${paymentMethod.sepa_debit?.country} ********** ${paymentMethod.sepa_debit?.last4}`}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="subtitle2" align="center" className={classes.bankCode}>
          {paymentMethod.sepa_debit?.bank_code}
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
