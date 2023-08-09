import React from 'react'
import { MenuItem } from '@material-ui/core'

import { useDomain, Domain } from 'common/i18n'
import { useFetch } from 'components/hooks/useFetch'
import useConfirm from 'components/hooks/useConfirm'
import ConfirmDialog from 'components/common/form/ConfirmDialog'
import { PaymentMethodDeleteResponse, PaymentMethodInput } from 'pages/api/payment-method/delete'

type DeletePaymentMethodButtonProps = {
  itemRef: React.Ref<HTMLLIElement>
  paymentMethodId: string
  onDelete?: () => void
}
const DeletePaymentMethodButton = ({
  itemRef,
  paymentMethodId,
  onDelete,
}: DeletePaymentMethodButtonProps) => {
  const t = useDomain(Domain.Forms)
  const [deleteMethod] = useFetch<PaymentMethodDeleteResponse, PaymentMethodInput>({
    method: 'POST',
    baseUrl: '/api/payment-method/delete',
  })
  const { open, openHandler, closeHandler, confirmHandler } = useConfirm({
    onClose: () => {},
    onConfirm: async () => {
      try {
        await deleteMethod({ body: { paymentMethodId } })
        if (typeof onDelete === 'function') {
          onDelete()
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
  return (
    <>
      <MenuItem ref={itemRef} dense onClick={openHandler}>
        {t('delete_payment_method')}
      </MenuItem>
      <ConfirmDialog
        dialogTitle={t('delete_payment_method')}
        dialogContent="message_confirm_delete_payment_method"
        {...{ open, closeHandler, confirmHandler }}
      />
    </>
  )
}

export default React.forwardRef<HTMLLIElement, Omit<DeletePaymentMethodButtonProps, 'itemRef'>>(
  (props, ref) => <DeletePaymentMethodButton itemRef={ref} {...props} />,
)
