import _ from 'lodash'
import React, { useState } from 'react'
import Countdown from 'react-countdown'
import { Typography, Grid } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { PickArrayType, SlotsListByOwnerQuery } from 'gql/schema'

import SlotItemBase, { SlotItemBaseProps } from './SlotItemBase'
import PhoneButton from './PhoneButton'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slotName: {
      marginBottom: ({ ongoingBooking }: { ongoingBooking: boolean }) => {
        if (ongoingBooking) {
          return theme.spacing(1)
        }
        return theme.spacing(0)
      },
    },
    time: {
      textShadow: '0px 0px 20px #0AFFEF93',
      fontWeight: 'bold',
    },
  }),
)

type OwnSlot = PickArrayType<SlotsListByOwnerQuery['slotsList']>
type OwnSlotItemProps = Pick<SlotItemBaseProps, 'buttonProps'> & {
  slot: OwnSlot
}

export default function OwnSlotItem({ slot, ...props }: OwnSlotItemProps) {
  const [ongoingBooking, setOngoingBooking] = useState(slot.slotBookingsList.length > 0)

  const classes = useStyles({ ongoingBooking })

  return (
    <SlotItemBase {..._.pick(slot, ['name', 'photoUrl'])} {...props}>
      <Typography variant={ongoingBooking ? 'h5' : 'h4'} className={classes.slotName}>
        {slot.name}
      </Typography>
      {ongoingBooking && (
        <>
          <Typography color="secondary" variant="h3" className={classes.time}>
            <Countdown
              date={new Date(slot.slotBookingsList[0].endTime!)}
              daysInHours
              onComplete={() => setOngoingBooking(false)}
            />
          </Typography>
          <Grid container spacing={4}>
            <Grid item>
              <Typography variant="subtitle2">{slot.slotBookingsList[0].user?.name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                <strong>{slot.slotBookingsList[0].licensePlate}</strong>
              </Typography>
            </Grid>
          </Grid>
          <PhoneButton phone={slot.slotBookingsList[0].phone} />
        </>
      )}
    </SlotItemBase>
  )
}
