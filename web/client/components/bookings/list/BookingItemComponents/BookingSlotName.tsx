import _ from 'lodash'
import React from 'react'
import { Typography, Grid, Box } from '@material-ui/core'

import { PickArrayType, SlotBookingsByUserIdQuery } from 'gql/schema'
import { useDomain, Domain } from 'common/i18n'

import useStyles from './bookingItemStyles'

type Booking = PickArrayType<SlotBookingsByUserIdQuery['slotBookingsList']>

type BookingSlotNameProps = {
  booking: Booking
}

export default function BookingSlotName({ booking }: BookingSlotNameProps) {
  const classes = useStyles()
  const t = useDomain(Domain.General)

  return (
    <Grid container spacing={1}>
      <Grid item xs={8}>
        <Typography variant="caption" className={classes.text}>
          {t('parking_at')}
        </Typography>
        <Typography variant="h4" color="secondary" className={classes.slotName}>
          <Box fontWeight={600}>{booking.slot?.name}</Box>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="caption" className={classes.text}>
          {t('ID')}
        </Typography>
        <Typography variant="subtitle2" className={classes.text}>
          <Box fontWeight={600}>#{booking.id.substring(0, 8)}</Box>
        </Typography>
      </Grid>
    </Grid>
  )
}
