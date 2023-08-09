import React, { useState, MouseEvent } from 'react'
import { Fab, useMediaQuery, Theme, Link } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Trans, useTranslation } from 'react-i18next'

import routes from 'common/routes'
import { Domain } from 'common/i18n/locale'
import useConfirm from 'components/hooks/useConfirm'
import ConfirmDialog from 'components/common/form/ConfirmDialog'
import TermsDialog from 'components/privacy/TermsDialog'
import { useUpdateBookingMutation, BookingStatusT } from 'gql/schema'

type CancelBookingButtonProps = {
  bookingId: string
  onCancel?: () => void
}
export default function CancelBookingButton({ bookingId, onCancel }: CancelBookingButtonProps) {
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
  const { t } = useTranslation(Domain.Pages)
  const [cancelBooking] = useUpdateBookingMutation()
  const [termsOpened, setTermsOpened] = useState(false)
  const { open, openHandler, closeHandler, confirmHandler } = useConfirm({
    onConfirm: async () => {
      try {
        await cancelBooking({
          variables: { id: bookingId, patch: { status: BookingStatusT.Canceled } },
        })
        if (typeof onCancel === 'function') {
          onCancel()
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
  const openTerms = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setTermsOpened(true)
  }
  const closeTerms = () => setTermsOpened(false)
  return (
    <>
      <Fab color="primary" size="small" onClick={openHandler}>
        <Close color="error" fontSize={mobile ? 'small' : 'default'} />
      </Fab>
      <ConfirmDialog
        dialogTitle={t('message_confirm_cancel_booking')}
        dialogContent={
          <Trans
            ns={Domain.General}
            i18nKey="booking_already_started"
            components={{
              button: (
                <Link
                  component="a"
                  color="secondary"
                  underline="none"
                  href={routes.terms}
                  onClick={openTerms}
                />
              ),
            }}
          />
        }
        confirmButton="YES"
        {...{ open, closeHandler, confirmHandler }}
      />
      <TermsDialog open={termsOpened} onClose={closeTerms} buttonLabel="continue" />
    </>
  )
}
