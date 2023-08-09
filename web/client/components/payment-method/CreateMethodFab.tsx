import { MenuItem } from '@material-ui/core'
import FabMenu from 'components/common/FabMenu'
import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import { Domain } from 'common/i18n'
import PaymentMethodDialog, { AvailablePaymentMethods } from './form/PaymentMethodDialog'

type CreateMethodFabParams = {
  onCreate?: (paymentMethodId: string) => void
}

export default function CreateMethodFab({ onCreate }: CreateMethodFabParams) {
  const { t } = useTranslation(Domain.Pages)
  const [type, openDialog] = useState<AvailablePaymentMethods | false>(false)
  const createCard = () => openDialog('card')
  const createSepa = () => openDialog('sepa_debit')
  return (
    <>
      <FabMenu
        fabProps={{ size: 'small' }}
        menuProps={{
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          transformOrigin: { vertical: 'top', horizontal: 'left' },
        }}>
        <MenuItem onClick={createCard}>{t('Credit Card')}</MenuItem>
        <MenuItem onClick={createSepa}>{t('SEPA Direct Debit')}</MenuItem>
      </FabMenu>
      <PaymentMethodDialog
        open={!!type}
        type={type || 'card'}
        onCreate={async (paymentMethodId) => {
          openDialog(false)
          if (typeof onCreate === 'function') {
            onCreate(paymentMethodId)
          }
        }}
        onClose={() => openDialog(false)}
      />
    </>
  )
}
