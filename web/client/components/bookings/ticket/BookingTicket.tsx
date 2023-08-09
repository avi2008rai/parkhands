import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Typography, Box, CircularProgress } from '@material-ui/core'
import { format } from 'date-fns'

import { Domain } from 'common/i18n/locale'
import { differenceInHours } from 'common/utils/time'
import SlotImage from 'components/slots/SlotImage'
import { useBooking } from 'components/hooks/useBooking'

import BookingInfo from '../BookingInfo'
import ProblemsWithBooking from './ProblemsWithBooking'
import BookingActions from './BookingActions'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
    },
  }),
)

type BookingTicketProps = {
  slotBookingId?: string
}
export default function BookingTicket({ slotBookingId }: BookingTicketProps) {
  const classes = useStyles()
  const { t } = useTranslation([Domain.General, Domain.Forms])
  const { fetchBooking, booking } = useBooking()
  useEffect(() => {
    if (slotBookingId) {
      fetchBooking(slotBookingId)
    }
  }, [slotBookingId])

  if (!booking) {
    return <CircularProgress />
  }

  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      <Box>
        <SlotImage photoUrl={booking.slot?.photoUrl} noBorderRadius imageGradient="vertical" />
      </Box>
      <Box display="flex" flexDirection="column" pt={4.5} px={2.5}>
        <BookingInfo
          slotName={booking.slot?.name || ''}
          slotId={booking.slot?.id || ''}
          bookingPrice={parseInt(booking.paymentReceipt?.amount) / 100}
          bookingDurationInHours={differenceInHours(
            new Date(booking.endTime!),
            new Date(booking.startTime!),
          )}
        />
        <Box display="flex" pt={2} flexGrow={2}>
          <Box flexGrow={2}>
            <Typography align="left" variant="body2">
              {t(`${Domain.Forms}@From`)}
            </Typography>
            <Typography align="left" variant="caption" color="secondary">
              <Box fontWeight={600}>{format(new Date(booking.startTime!), 'MM/dd/yyyy kk:mm')}</Box>
            </Typography>
          </Box>
          <Box flexGrow={2}>
            <Typography align="left" variant="body2">
              {t(`${Domain.Forms}@To`)}
            </Typography>
            <Typography align="left" variant="caption" color="secondary">
              <Box fontWeight={600}>{format(new Date(booking.endTime!), 'MM/dd/yyyy kk:mm')}</Box>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box display="flex" py={3} px={4} flexGrow={12} alignItems="center">
        <ProblemsWithBooking slotBookingId={booking.id} />
      </Box>
      <Box pt={2} pb={3} flexGrow={2}>
        <BookingActions />
      </Box>
    </Box>
  )
}
