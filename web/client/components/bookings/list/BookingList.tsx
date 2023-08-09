import _ from 'lodash'
import React from 'react'
import { Grid } from '@material-ui/core'

import { PickArrayType, SlotBookingsByUserIdQuery } from 'gql/schema'

import BookingItem from './BookingItem'

type Booking = PickArrayType<SlotBookingsByUserIdQuery['slotBookingsList']>

export type BookingListProps = {
  bookings: Booking[]
}

export default function BookingList({ bookings }: BookingListProps) {
  return (
    <Grid container direction="column" spacing={0}>
      {_.map(bookings, (booking: Booking) => {
        return (
          <Grid item key={booking.id}>
            <BookingItem booking={booking} />
          </Grid>
        )
      })}
    </Grid>
  )
}
