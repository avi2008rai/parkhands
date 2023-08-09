import _ from 'lodash'
import React, { useMemo } from 'react'
import { isBefore } from 'date-fns'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Box, Chip, IconButton, Fab } from '@material-ui/core'
import { Refresh } from '@material-ui/icons'

import { PickArrayType, SlotBookingsByUserIdQuery, BookingStatusT } from 'gql/schema'
import { useDomain, Domain } from 'common/i18n'
import { differenceInHours } from 'common/utils/time'
import InvoiceIcon from 'components/common/icon/InvoiceIcon'
import CancelBookingButton from 'components/bookings/CancelBookingButton'
import LocationButton from 'components/bookings/LocationButton'

import { useBookingPageContext } from '../BookingPage'
import useCommonStyles from './bookingItemStyles'
import BookingRefreshButton from './BookingRefreshButton'

type Booking = PickArrayType<SlotBookingsByUserIdQuery['slotBookingsList']>

export enum BookingStatus {
  Ongoing = 'Ongoing',
  Planned = 'Planned',
  Canceled = 'Canceled',
  Expired = 'Expired',
}

function getBookingStatus(booking: Booking): BookingStatus {
  if (booking.status === BookingStatusT.Canceled) {
    return BookingStatus.Canceled
  }
  const now = new Date()
  if (isBefore(new Date(booking.endTime!), now)) {
    return BookingStatus.Expired
  }
  if (isBefore(now, new Date(booking.startTime!))) {
    return BookingStatus.Planned
  }
  return BookingStatus.Ongoing
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      borderRadius: '4px',
      color: '#000000',
      textTransform: 'capitalize',
      marginTop: -theme.spacing(0.25),
      [theme.breakpoints.only('xs')]: {
        marginTop: -theme.spacing(1),
        fontSize: theme.typography.pxToRem(8),
        padding: theme.spacing(0),
      },
      backgroundColor: ({ bookingStatus }: { bookingStatus: BookingStatus }) => {
        switch (bookingStatus) {
          case BookingStatus.Ongoing:
            return theme.palette.secondary.main
          case BookingStatus.Canceled:
            return theme.palette.error.main
          case BookingStatus.Planned:
            return '#FFFFFF'
          case BookingStatus.Expired:
            return theme.palette.success.main
        }
      },
    },
  }),
)
type BookingPriceAndActionsProps = {
  booking: Booking
}

export default function BookingPriceAndActions({ booking }: BookingPriceAndActionsProps) {
  const { refetch } = useBookingPageContext()
  const bookingStatus = useMemo(() => {
    return getBookingStatus(booking)
  }, [booking])
  const price = useMemo(() => {
    return parseInt(booking.paymentReceipt?.amount) / 100
  }, [booking])
  const classes = useStyles({ bookingStatus })
  const commonClasses = useCommonStyles()
  const t = useDomain([Domain.General, Domain.Forms, Domain.Pages, Domain.Bookings])

  return (
    <Grid container spacing={1}>
      <Grid item xs={7}>
        <Grid container spacing={1} direction="row">
          <Grid item xs={4}>
            <Grid container spacing={1} direction="column">
              <Grid item>
                <Typography variant="caption" className={commonClasses.text}>
                  {t('status')}
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  size="small"
                  label={t(getBookingStatus(booking))}
                  classes={{ root: classes.chip }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={1} direction="column">
              <Grid item>
                <Typography variant="caption" className={commonClasses.text}>
                  {t('price')}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" className={commonClasses.text}>
                  <Box fontWeight={600}>{price > 0 ? <>{price} &euro;</> : t('free')}</Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={1} direction="column">
              <Grid item>
                <Typography variant="caption" className={commonClasses.text}>
                  {t('duration')}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" className={commonClasses.text}>
                  <Box fontWeight={600}>
                    {t('hour', {
                      count: differenceInHours(
                        new Date(booking.endTime!),
                        new Date(booking.startTime!),
                      ),
                    })}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Grid container justify="flex-end" direction="row" alignItems="center" spacing={0}>
          {bookingStatus === BookingStatus.Canceled &&
            isBefore(new Date(), new Date(booking.startTime!)) && (
              <Grid item>
                <BookingRefreshButton
                  slotId={booking.slotId!}
                  startTime={new Date(booking.startTime!)}
                  endTime={new Date(booking.endTime!)}
                />
              </Grid>
            )}
          {(bookingStatus === BookingStatus.Planned || bookingStatus === BookingStatus.Ongoing) && (
            <Grid item>
              <Box pr={1}>
                <CancelBookingButton bookingId={booking.id} onCancel={refetch} />
              </Box>
            </Grid>
          )}
          {bookingStatus === BookingStatus.Ongoing && (
            <Grid item>
              <LocationButton
                location={{
                  lat: booking.slot?.location.latitude!,
                  lng: booking.slot?.location.longitude!,
                }}
              />
            </Grid>
          )}
          <Grid item>
            {booking.paymentReceipt?.receiptUrl && (
              <IconButton href={booking.paymentReceipt.receiptUrl} target="_blank">
                <InvoiceIcon color="secondary" fontSize="large" />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
