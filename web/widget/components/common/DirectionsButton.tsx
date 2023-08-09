import React, { useMemo } from 'react'
import { Button, ButtonProps } from '@material-ui/core'

import { useCurrentPosition } from 'components/hooks/useCurrentPosition'

type DirectionsButtonProps = {
  label?: string
  start?: google.maps.LatLngLiteral
  destination: google.maps.LatLngLiteral
  useBrowserPosition?: boolean
} & Pick<ButtonProps, 'fullWidth' | 'color' | 'variant' | 'classes'>

export default function DirectionsButton({
  start,
  destination,
  label = 'Navigation',
  useBrowserPosition = false,
  ...props
}: DirectionsButtonProps) {
  const [position] = useCurrentPosition({ enableHighAccuracy: true })

  const href = useMemo(() => {
    const destLocation = `${destination.lat},${destination.lng}`

    const startPosition =
      start ||
      (useBrowserPosition &&
        position && {
          lat: position?.coords.latitude,
          lng: position?.coords.longitude,
        })

    if (!startPosition) {
      // Display destination address as a place if start location is not provided
      return `https://www.google.com/maps/place/${destLocation}/@${destLocation},199m`
    }

    // Display directions from start to destination
    const startLocation = `${startPosition.lat},${startPosition.lng}`
    return `https://www.google.com/maps/dir/${startLocation}/${destLocation}/`
  }, [position, start, destination])

  return (
    <Button
      href={href}
      color="primary"
      target="_blank"
      variant="contained"
      rel="noopener noreferrer"
      {...props}>
      {label}
    </Button>
  )
}
