import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n'
import ActionDialog, { ActionDialogProps } from 'components/common/ActionDialog'

import BookingTicket from './BookingTicket'

type BookingDialogProps = {
  slotBookingId?: string
  open?: boolean
  onClose?: () => void
  onSuccess?: () => void
} & ActionDialogProps
export default function BookingTicketDialog({
  slotBookingId,
  open,
  onClose,
  ...props
}: BookingDialogProps) {
  const { t } = useTranslation(Domain.General)
  return (
    <ActionDialog
      flex
      open={open}
      onClose={onClose}
      headerLabel={t('Booking', { id: slotBookingId?.substring(0, 8) })}
      {...props}>
      <BookingTicket slotBookingId={slotBookingId} />
    </ActionDialog>
  )
}
