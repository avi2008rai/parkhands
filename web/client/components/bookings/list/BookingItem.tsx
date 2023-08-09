import _ from 'lodash'
import React from 'react'
import { Box, Divider } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

import { PickArrayType, SlotBookingsByUserIdQuery } from 'gql/schema'
import routes from 'common/routes'
import LinkButton from 'components/common/LinkButton'

import BookingSlotName from './BookingItemComponents/BookingSlotName'
import BookingTime from './BookingItemComponents/BookingTime'
import BookingPriceAndActions from './BookingItemComponents/BookingPriceAndActions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonRoot: {
      width: '100%',
      textAlign: 'left',
      display: 'block',
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(2),
      },
    },
  }),
)

type Booking = PickArrayType<SlotBookingsByUserIdQuery['slotBookingsList']>
type BookingItemProps = {
  booking: Booking
}

export enum BookingStatus {
  Ongoing = 'Ongoing',
  Planned = 'Planned',
  Canceled = 'Canceled',
  Expired = 'Expired',
}

export default function BookingItem({ booking }: BookingItemProps) {
  const classes = useStyles()

  return (
    <Box>
      <LinkButton
        classes={{ root: classes.buttonRoot }}
        {...routes.bookings.viewById({ id: booking.id })}>
        <Box py={1}>
          <BookingSlotName booking={booking} />
        </Box>
        <Box py={1}>
          <BookingTime booking={booking} />
        </Box>
      </LinkButton>
      <Box py={1} p={{ xs: 0, sm: 2 }}>
        <BookingPriceAndActions booking={booking} />
      </Box>
      <Box mt={2} mb={-2}>
        <Divider />
      </Box>
    </Box>
  )
}
