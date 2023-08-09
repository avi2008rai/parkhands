import React from 'react'
import { Marker, MarkerProps } from '@react-google-maps/api'

export type SlotMarkerProps = {
  selected: boolean
} & MarkerProps
export default function SlotMarker({ selected, ...props }: SlotMarkerProps) {

  return (
    <Marker
      icon={{
        // ref: https://developers.google.com/maps/documentation/javascript/markers#complex_icons
        url: selected ? '/static/parkhands-marker-selected.png' : '/static/parkhands-marker.png',
        size: new google.maps.Size(24, 24),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(6, 24),
      }}
      {...props}
    />
  )
}
