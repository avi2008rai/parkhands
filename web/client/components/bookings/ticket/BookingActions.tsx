import _ from 'lodash'
import React, { useMemo } from 'react'
import Countdown from 'react-countdown'
import { useTranslation } from 'react-i18next'
import { Grid, Typography, Box } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

import { Domain } from 'common/i18n/locale'
import { useBooking } from 'components/hooks/useBooking'
import { useActiveBooking } from 'components/hooks/useActiveBooking'

import LocationButton from '../LocationButton'
import CancelBookingButton from '../CancelBookingButton'
import BookingExtendButton from './BookingExtendButton'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fabContainer: {
      textAlign: 'center',
    },
    time: {
      textShadow: '0px 0px 20px #0AFFEF93',
    },
    cta: {
      borderRadius: 0,
      fontSize: theme.typography.pxToRem(14),
      padding: theme.spacing(2, 0),
      background:
        'transparent linear-gradient(173deg, #00FFF1 0%, #00EBFF 100%) 0% 0% no-repeat padding-box',
      '& > .MuiButton-label': {
        textTransform: 'uppercase',
      },
    },
  }),
)

export default function BookingActions() {
  const {
    booking,
    ongoing,
    expired,
    canceled,
    checkOngoing,
    startHour,
    endHour,
    refreshBooking,
  } = useBooking()
  const { activeBooking, refreshBookings } = useActiveBooking()

  if (!booking) {
    return null
  }

  const classes = useStyles()
  const { t } = useTranslation([Domain.General, Domain.Pages])
  const onCancel = () => {
    refreshBooking()
    if (booking.id === activeBooking?.id) {
      refreshBookings()
    }
  }

  const status = useMemo((): React.ReactNode => {
    if (canceled) {
      return t('Canceled')
    }
    if (ongoing) {
      return (
        <Countdown
          daysInHours
          key={`${booking.endTime!}`}
          onComplete={refreshBooking}
          date={new Date(booking.endTime!)}>
          <>{t('parking_period_expired')}</>
        </Countdown>
      )
    }
    if (expired) {
      return t('Finished')
    }
    // upcoming
    return (
      <Countdown
        daysInHours
        key={`${booking.startTime!}`}
        onComplete={() => checkOngoing()}
        date={new Date(booking.startTime!)}
        renderer={({ total, seconds, completed }) => {
          if (completed) {
            return null
          }
          if (total < 60000) {
            return t(`${Domain.Pages}@starting_in`, { seconds })
          }
          return `${startHour} - ${endHour}`
        }}
      />
    )
  }, [booking.startTime, booking.endTime, ongoing, expired, canceled, refreshBooking])

  return (
    <Grid container justify="center" direction="row" alignItems="center" spacing={0}>
      <Grid item xs={2} className={classes.fabContainer}>
        {!expired && !canceled && (
          <CancelBookingButton bookingId={booking.id} onCancel={onCancel} />
        )}
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3" align="center" color="secondary" className={classes.time}>
          <Box fontWeight="600">{status}</Box>
        </Typography>
        <BookingExtendButton />
      </Grid>
      <Grid item xs={2} className={classes.fabContainer}>
        <LocationButton
          location={{
            lat: booking.slot?.location.latitude!,
            lng: booking.slot?.location.longitude!,
          }}
        />
      </Grid>
    </Grid>
  )
}
