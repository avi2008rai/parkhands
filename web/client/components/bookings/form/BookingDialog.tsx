import _ from 'lodash'
import React, { useCallback } from 'react'

import { PickArrayType, SlotByIdQuery } from 'gql/schema'
import ActionDialog from 'components/common/ActionDialog'
import { useActiveBooking } from 'components/hooks/useActiveBooking'

import BookingForm from './BookingForm'

type Slot = PickArrayType<SlotByIdQuery['slot']>
type BookingDialogProps = {
  slot: Slot
  open: boolean
  onClose?: () => void
  onSuccess?: () => void
}
export default function BookingDialog({ slot, open, onClose, onSuccess }: BookingDialogProps) {
  const { refreshBookings } = useActiveBooking()

  const onFormSuccess = useCallback(() => {
    refreshBookings()
    if (typeof onSuccess === 'function') {
      onSuccess()
    }
  }, [onSuccess, refreshBookings])

  return (
    <ActionDialog flex headerLabel="booking_confirmation" open={open} onClose={onClose}>
      {slot && <BookingForm slot={slot} onFormSuccess={onFormSuccess} />}
    </ActionDialog>
  )
}
