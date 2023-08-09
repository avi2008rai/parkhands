import React from 'react'
import { useTranslation } from 'react-i18next'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'

import { Domain } from 'common/i18n'
import AmenityIcon from 'components/amenity/AmenityIcon'
import { PickArrayType, SlotByIdQuery } from 'gql/schema'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    amenityIcon: {
      padding: theme.spacing(0, 0.5),
    },
    amenityName: {
      fontSize: theme.typography.pxToRem(12),
    },
  }),
)

type Slot = NonNullable<SlotByIdQuery['slot']>
type Amenity = PickArrayType<Slot['slotAmenitiesList']>

type SlotAmenitiesProps = {
  amenities: Amenity[]
}
export default function SlotAmenities({ amenities }: SlotAmenitiesProps) {
  const { t } = useTranslation(Domain.Amenities)
  const classes = useStyles()

  return (
    <Grid container spacing={1}>
      {amenities.map(({ amenity }) => {
        if (!amenity) return null

        return (
          <Grid item xs={4} sm={6} lg={4} key={amenity.id}>
            <Grid container spacing={1} wrap="nowrap" alignItems="center">
              <Grid item className={classes.amenityIcon}>
                <AmenityIcon slug={amenity.slug || ''} color="secondary" fontSize="small" />
              </Grid>
              <Grid item>
                <Typography
                  noWrap
                  color="initial"
                  variant="body1"
                  classes={{ root: classes.amenityName }}>
                  {t(amenity.name)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  )
}
