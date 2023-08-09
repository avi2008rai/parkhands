import _ from 'lodash'
import React, { useMemo } from 'react'
import { Typography, Grid, Box } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

import { Slot } from 'components/hooks/useSelectedSlot'
import groupAmenities from 'components/amenity/groupAmenities'
import SlotAmenities from 'components/amenity/SlotAmenities'
import SlotAvailability from 'components/availability/SlotAvailability'

import SlotImage from '../SlotImage'
import SlotPrice from '../SlotPrice'
import SlotDetailsSection from './SlotDetailsSection'
import SelectedSlotCallToAction from './call-to-action/SelectedSlotCallToAction'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    address: {
      fontSize: theme.typography.pxToRem(10),
      opacity: 0.55,
    },
    longText: {
      fontSize: theme.typography.pxToRem(12),
      lineHeight: theme.typography.pxToRem(16),
    },
  }),
)

type SlotDetailsProps = {
  slot: Slot
  showCta?: boolean
}
export default function SlotDetails({ slot, showCta = false }: SlotDetailsProps) {
  const classes = useStyles()

  const { categories, amenities } = useMemo(() => {
    return groupAmenities(slot.slotAmenitiesList)
  }, [slot.slotAmenitiesList])

  return (
    <>
      <SlotImage size="large" photoUrl={slot.photoUrl} noBorderRadius imageGradient="vertical" />
      <Box p={2} px={3} mb="5rem">
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography variant="h3" color="secondary" paragraph>
              <strong>
                <SlotPrice pricePerHour={slot.pricePerHour} />
              </strong>
            </Typography>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid item xs={9}>
                <Typography variant="caption" className={classes.address}>
                  {slot.address?.formatted_address && (slot.address?.formatted_address as string)}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                {!_.isEmpty(categories) && (
                  <Typography align="right" display="block" variant="caption" color="secondary">
                    {categories[0].amenity?.name}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>

          {!_.isEmpty(amenities) && (
            <SlotDetailsSection>
              <SlotAmenities amenities={amenities} />
            </SlotDetailsSection>
          )}

          {slot.description && (
            <SlotDetailsSection label="parking_description">
              <Typography variant="subtitle2" className={classes.longText}>
                {slot.description}
              </Typography>
            </SlotDetailsSection>
          )}

          {slot.notes && (
            <SlotDetailsSection label="parking_rules">
              <Typography variant="subtitle2" className={classes.longText}>
                {slot.notes}
              </Typography>
            </SlotDetailsSection>
          )}

          {!_.isEmpty(slot.slotAvailabilitiesList) && (
            <SlotDetailsSection label="Availability">
              <SlotAvailability
                slot={slot}
                typographyProps={{ color: 'initial', variant: 'body1' }}
              />
            </SlotDetailsSection>
          )}

          {showCta && (
            <Grid item>
              <SelectedSlotCallToAction slot={slot} />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  )
}
