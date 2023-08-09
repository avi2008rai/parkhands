import React, { useMemo } from 'react'
import { Typography, Box, CardContent, Grid } from '@material-ui/core'
import { useSlotBookingStatusQuery, SlotAvailabilityBookingStatus } from 'gql/schema'

import { Slot } from 'components/hooks/useSelectedSlot'
import { useFilters } from 'components/hooks/useFilters'
import AmenityIcons from 'components/amenity/AmenityIcon'
import groupAmenities from 'components/amenity/groupAmenities'

import useStyles from './styles'
import ReserveSlotButton from '../call-to-action/ReserveSlotButton'

type SlotCardProps = {
  slot: Slot
  onClick: () => void
}

export default function SlotCardContent({ slot, onClick }: SlotCardProps) {
  const classes = useStyles()
  // check slot availability
  const {
    time: { start, end },
  } = useFilters()
  const { data } = useSlotBookingStatusQuery({
    variables: {
      payload: {
        startTime: start,
        endTime: end,
        slotId: slot?.id,
      },
    },
  })

  const { amenities } = useMemo(() => {
    return groupAmenities(slot.slotAmenitiesList)
  }, [slot.slotAmenitiesList])

  const available = data?.slotBookingStatus === SlotAvailabilityBookingStatus.Available
  return (
    <>
      <CardContent className={classes.cardContent} onClick={onClick}>
        <Box>
          <Typography variant="h6" className={classes.name} color="primary">
            <Box fontWeight={600}>{slot.name}</Box>
          </Typography>
        </Box>
        <Box>
          {slot.address?.formatted_address && (
            <Typography variant="caption" className={classes.address}>
              {slot.address?.formatted_address as string}
            </Typography>
          )}
          <Box pt={1}>
            <Grid container spacing={0}>
              {amenities.map(({ amenity }) => {
                return (
                  <Grid item key={amenity?.id} className={classes.amenityIcon}>
                    <AmenityIcons slug={amenity?.slug || ''} color="secondary" fontSize="small" />
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </Box>
      </CardContent>
      {available ? (
        <Box className={classes.buttonContainer}>
          <ReserveSlotButton
            slot={slot}
            classes={{ root: classes.cta }}
            color="primary"
            fullWidth={false}
          />
        </Box>
      ) : null}
    </>
  )
}
