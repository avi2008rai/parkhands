import _ from 'lodash'
import React, { useMemo } from 'react'
import getConfig from 'next/config'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Card, CardContent, CardMedia, CardActions } from '@material-ui/core'
import { Check } from '@material-ui/icons'
import { SlotByIdQuery } from 'gql/schema'

import BookButton from './BookButton'
import CloseModalButton from './CloseModalButton'

const { CDN_URL } = getConfig().publicRuntimeConfig

const defaultPhoto = '/static/default-slot-image.png'
const cardWidthInRem = 20

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      width: `${cardWidthInRem}rem`,
      marginLeft: `calc(50vw - ${cardWidthInRem / 2}rem)`,
      [theme.breakpoints.only('xs')]: {
        bottom: 0,
        width: '100%',
        margin: 0,
      },
    },
    name: {
      fontWeight: 500,
      marginRight: theme.spacing(2),
    },
    address: {
      color: theme.palette.grey[600],
    },
    image: {
      height: '7rem',
    },
    actions: {
      justifyContent: 'space-around',
    },
    cardContent: {
      position: 'relative',
      padding: theme.spacing(1, 2),
    },
  }),
)

type Slot = NonNullable<SlotByIdQuery['slot']>

type SlotAmenitiesProps = {
  slot: Slot
}
const SlotAmenityIcons = ({ slot }: SlotAmenitiesProps) => {
  if (_.isEmpty(slot?.slotAmenitiesList)) {
    return null
  }
  return (
    <Grid item container spacing={1}>
      {slot.slotAmenitiesList?.map((slotAmenity) => {
        return (
          <Grid item key={slotAmenity?.id} xs={6}>
            <Grid container spacing={1}>
              <Grid item>
                <Check fontSize="small" color="secondary" />
              </Grid>
              <Grid item>
                <Typography variant="caption" color="primary">
                  {slotAmenity?.amenity?.name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  )
}

type SlotCardProps = {
  slot: Slot
  onClose: () => void
}
export default function SlotCard({ slot, onClose }: SlotCardProps) {
  const classes = useStyles()
  const imageUrl = useMemo(() => {
    if (slot.photoUrl) {
      return `${CDN_URL}/thumbnails/uploads/${slot.photoUrl}`
    }
    return defaultPhoto
  }, [slot])

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.image} image={imageUrl} />
      <CardContent className={classes.cardContent}>
        <CloseModalButton onClose={onClose} />
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography className={classes.name} color="primary">
              {slot.name}
            </Typography>
          </Grid>
          {slot.address?.formatted_address && (
            <Grid item>
              <Typography variant="caption" className={classes.address}>
                {slot.address?.formatted_address as string}
              </Typography>
            </Grid>
          )}
          <SlotAmenityIcons slot={slot} />
        </Grid>
      </CardContent>
      <CardActions className={classes.actions} disableSpacing>
        <BookButton slotId={slot.id} />
      </CardActions>
    </Card>
  )
}
