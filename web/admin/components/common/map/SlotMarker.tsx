import React from 'react'
import { Marker } from '@react-google-maps/api'
import { Clusterer } from '@react-google-maps/marker-clusterer'

import { PickArrayType, SlotsListQuery } from 'gql/schema'

type Slot = PickArrayType<SlotsListQuery['slotsList']>
type SlotsMarkerProps = {
  slot: Slot
  onClick?: () => void
  clusterer?: Clusterer
}
export default function SlotsMarker({ slot, onClick, clusterer }: SlotsMarkerProps) {
  return (
    <Marker
      key={slot.id}
      clusterer={clusterer}
      position={{
        lat: slot.location.latitude,
        lng: slot.location.longitude,
      }}
      onClick={onClick}
      icon={{
        // ref: https://developers.google.com/maps/documentation/javascript/markers#complex_icons
        url: '/static/parkhands-marker.png',
        size: new google.maps.Size(24, 24),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(6, 24),
      }}
    />
  )
}
