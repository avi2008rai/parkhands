import _ from 'lodash'
import React, { useMemo, useCallback } from 'react'
import { MyLocation } from '@material-ui/icons'
import { Fab, useMediaQuery } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { useSidekick } from 'components/hooks/useSidekick'
import { useMapCenter } from 'components/hooks/useMapCenter'
import { useCurrentPosition } from 'components/hooks/useCurrentPosition'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      bottom: theme.spacing(14),
      right: theme.spacing(1.5),
      [theme.breakpoints.only('xs')]: {
        bottom: theme.spacing(3),
      },
    },
  }),
)

export default function MyLocationButton() {
  const classes = useStyles()
  const { mapCenterView, setMapCenterView } = useMapCenter()
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
  const { primary: primaryDeck } = useSidekick()
  const [position, error] = useCurrentPosition()
  const handleClick = useCallback(() => {
    if (position) {
      setMapCenterView({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom: 18,
      })
    }
  }, [position])
  const shouldRenderNull = useMemo(() => {
    return error || (mobile && mapCenterView && primaryDeck)
  }, [error, mobile, mapCenterView, primaryDeck])

  if (shouldRenderNull) {
    return null
  }

  return (
    <Fab
      className={classes.root}
      color="primary"
      onClick={handleClick}
      size={mobile ? 'large' : 'small'}>
      <MyLocation color="secondary" />
    </Fab>
  )
}
