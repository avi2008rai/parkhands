import _ from 'lodash'
import { format } from 'date-fns'
import React from 'react'

import { Typography, Grid, Box } from '@material-ui/core'
import { PickArrayType, SlotBookingsByUserIdQuery } from 'gql/schema'
import { useDomain, Domain } from 'common/i18n'

import useStyles from './bookingItemStyles'

const dateFormat = 'MM/dd/yyyy HH:mm'

type Booking = PickArrayType<SlotBookingsByUserIdQuery['slotBookingsList']>
type BookingTimeProps = {
  booking: Booking
}

export default function BookingTime({ booking }: BookingTimeProps) {
  const classes = useStyles()
  const t = useDomain(Domain.General)

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Typography variant="caption" className={classes.text}>
          {t(`${Domain.Forms}@From`)}
        </Typography>
        <Typography variant="subtitle2" className={classes.text}>
          <Box fontWeight={600}>{format(new Date(booking.startTime!), dateFormat)}</Box>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="caption" className={classes.text}>
          {t(`${Domain.Forms}@To`)}
        </Typography>
        <Typography variant="subtitle2" className={classes.text}>
          <Box fontWeight={600}>{format(new Date(booking.endTime!), dateFormat)}</Box>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="caption" className={classes.text}>
          {t(`${Domain.Pages}@license_plate`)}
        </Typography>
        <Typography variant="subtitle2" className={classes.text}>
          <Box fontWeight={600}>{booking.licensePlate}</Box>
        </Typography>
      </Grid>
    </Grid>
  )
}
