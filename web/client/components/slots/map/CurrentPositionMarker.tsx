import _ from 'lodash'
import React, { useMemo } from 'react'
import { Marker } from '@react-google-maps/api'

import { useCurrentPosition } from 'components/hooks/useCurrentPosition'

export default function CurrentPositionMarker() {
  const [currentPosition, error] = useCurrentPosition()
  const isValidPosition = useMemo(() => {
    return !error && !!currentPosition?.coords.latitude && !!currentPosition?.coords.longitude
  }, [currentPosition, error])

  if (!isValidPosition) {
    return null
  }

  return (
    <Marker
      clickable={false}
      position={{
        // We are sure that latitude and longitude are present because of the above check.
        lat: currentPosition?.coords.latitude as number,
        lng: currentPosition?.coords.longitude as number,
      }}
      icon={{
        // ref: https://developers.google.com/maps/documentation/javascript/markers#complex_icons
        url: '/static/map/current-location-marker.png',
        size: new google.maps.Size(24, 24),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(12, 12),
      }}
    />
  )
}
