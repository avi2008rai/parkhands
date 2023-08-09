import React from 'react'
import cn from 'classnames'
import { Box } from '@material-ui/core'

import { PickArrayType, SlotByIdQuery } from 'gql/schema'
import { useFilters } from 'components/hooks/useFilters'
import DirectionsButton from 'components/common/DirectionsButton'
import { useSlotBookingStatusQuery, SlotAvailabilityBookingStatus } from 'gql/schema'

import ReserveSlotButton from './ReserveSlotButton'
import useStyles from './styles'

type Slot = PickArrayType<SlotByIdQuery['slot']>
type SelectedSlotCallToActionProps = {
  slot: Slot
  inDialog?: boolean
}

export default function SelectedSlotCallToAction({
  slot,
  inDialog = false,
}: SelectedSlotCallToActionProps) {
  const classes = useStyles()

  const {
    time: { start, end },
  } = useFilters()
  const { data, loading } = useSlotBookingStatusQuery({
    variables: {
      payload: {
        startTime: start,
        endTime: end,
        slotId: slot?.id,
      },
    },
  })

  if (!slot || loading) {
    return null
  }

  return (
    <Box
      className={cn({
        CallToActionButton: !inDialog,
        [classes.buttonContainer]: !inDialog,
      })}>
      {data?.slotBookingStatus === SlotAvailabilityBookingStatus.Available ? (
        <ReserveSlotButton
          inDialog={inDialog}
          slot={slot}
          classes={{
            root: classes.cta,
            label: classes.label,
          }}
          color="secondary"
        />
      ) : (
        <DirectionsButton
          fullWidth
          color="secondary"
          variant="contained"
          classes={{
            root: classes.cta,
            label: classes.label,
          }}
          useBrowserPosition
          destination={{
            lat: slot.location.latitude,
            lng: slot.location.longitude,
          }}
        />
      )}
    </Box>
  )
}
