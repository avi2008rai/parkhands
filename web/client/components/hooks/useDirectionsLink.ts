import { useMemo } from 'react'

import { useCurrentPosition } from './useCurrentPosition'

export type DirectionsLinkProps = {
  start?: google.maps.LatLngLiteral
  destination: google.maps.LatLngLiteral
  useBrowserPosition?: boolean
}

export function useDirectionsLink({ start, destination, useBrowserPosition }: DirectionsLinkProps) {
  const [position] = useCurrentPosition()

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

  return { href }
}
