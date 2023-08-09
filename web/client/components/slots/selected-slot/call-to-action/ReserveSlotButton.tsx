import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonProps, Theme, useMediaQuery } from '@material-ui/core'

import { PickArrayType, SlotByIdQuery } from 'gql/schema'
import { Domain } from 'common/i18n'
import BookingDialog from 'components/bookings/form/BookingDialog'
import DialogSubmitButton from 'components/common/form/DialogSubmitButton'

type Slot = PickArrayType<SlotByIdQuery['slot']>
type DirectionsButtonProps = {
  label?: string
  slot: Slot
  inDialog?: boolean
} & Pick<ButtonProps, 'fullWidth' | 'color' | 'variant' | 'classes'>

export default function ReserveSlotButton({
  label = 'Reserve',
  inDialog = false,
  slot,
  ...props
}: DirectionsButtonProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const { t } = useTranslation(Domain.Forms)
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'))
  const openDialog = (e: React.MouseEvent) => {
    e?.preventDefault()
    setModalOpen(true)
  }
  const closeDialog = () => setModalOpen(false)
  return (
    <>
      {inDialog ? (
        <DialogSubmitButton
          fullWidth
          label={label}
          color="secondary"
          variant="contained"
          onClick={openDialog}
        />
      ) : (
        <Button fullWidth component="a" variant="contained" onClick={openDialog} {...props}>
          {t(label)}
        </Button>
      )}
      <BookingDialog slot={slot} open={modalOpen} onClose={closeDialog} />
    </>
  )
}
