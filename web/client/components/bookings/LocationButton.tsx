import _ from 'lodash'
import React from 'react'
import { Fab, useMediaQuery, Theme } from '@material-ui/core'
import { LocationOn } from '@material-ui/icons'

import { useDirectionsLink } from 'components/hooks/useDirectionsLink'

type LocationButtonProps = {
  location: google.maps.LatLngLiteral
}
export default function LocationButton({ location }: LocationButtonProps) {
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
  const { href } = useDirectionsLink({
    destination: location,
    useBrowserPosition: true,
  })

  return (
    <Fab href={href} target="_blank" color="primary" size="small">
      <LocationOn color="secondary" fontSize={mobile ? 'small' : 'default'} />
    </Fab>
  )
}
