import React from 'react'
import { Typography } from '@material-ui/core'

import { useDomain, Domain } from 'common/i18n'
import PageDialog from 'components/common/PageDialog'
import LoadStripe from 'components/payment/LoadStripe'

import CreditCardForm from './CreditCardForm'
import SepaDebitForm from './SepaDebitForm'

export type AvailablePaymentMethods = 'card' | 'sepa_debit'

type PaymentMethodDialogProps = {
  type: AvailablePaymentMethods
  open: boolean
  onCreate?: (paymentMethodId: string) => void
  onClose?: () => void
}

export default function PaymentMethodDialog({
  type,
  open,
  onClose,
  onCreate,
}: PaymentMethodDialogProps) {
  const t = useDomain(Domain.Pages)
  return (
    <PageDialog open={open} onClose={onClose}>
      <Typography variant="h3" paragraph>
        {t('payment_methods')}
      </Typography>
      <Typography variant="h5" paragraph>
        {type === 'card' && t('credit_card')}
        {type === 'sepa_debit' && t('sepa_direct_debit')}
      </Typography>
      <LoadStripe>
        {type === 'card' && <CreditCardForm onCreate={onCreate} />}
        {type === 'sepa_debit' && <SepaDebitForm onCreate={onCreate} />}
      </LoadStripe>
    </PageDialog>
  )
}
