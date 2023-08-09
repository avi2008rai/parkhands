import React, { useMemo, useCallback } from 'react'
import { Marker } from '@react-google-maps/api'

import { ClusterPoint } from 'pages/api/slots/find'
import { useMapCenter } from 'components/hooks/useMapCenter'
import { useSlots } from 'components/hooks/useSlots'

// Relies that this is a big enough zoom change so the cluster is "broken down"
// into smaller clusters and/or slots.
// The steps should be small enough so an animation from GoogleMaps is triggered.
// For example if the jump is 6, the map just "teleports" to the zoom level
// without animation.
const ZOOM_STEP_ON_CLICK = 3

type ClusterMarkerProps = {
  clusterPoint: ClusterPoint
}
export default function ClusterMarker({ clusterPoint }: ClusterMarkerProps) {
  const { animateMapCenterView } = useMapCenter()
  const { zoom } = useSlots()

  const {
    geometry,
    properties: { point_count_abbreviated },
  } = clusterPoint
  const location = useMemo(
    () => ({
      lng: geometry.coordinates[0],
      lat: geometry.coordinates[1],
    }),
    [geometry],
  )

  const clickHandler = useCallback(() => {
    animateMapCenterView({
      lat: location.lat,
      lng: location.lng,
      zoom: Math.min(zoom + ZOOM_STEP_ON_CLICK, 20),
    })
  }, [location, zoom])

  const icon = useMemo((): google.maps.Icon => {
    return {
      url: '/static/map/cluster.png',
      anchor: new google.maps.Point(19, 45),
      labelOrigin: new google.maps.Point(52, 23),
      scaledSize: new google.maps.Size(80, 56),
    }
  }, [point_count_abbreviated])

  const label = useMemo((): google.maps.MarkerLabel => {
    return {
      fontSize: '12px',
      fontFamily: 'Nunito',
      fontWeight: '400',
      text: point_count_abbreviated.toString(),
    }
  }, [point_count_abbreviated])

  return <Marker position={location} onClick={clickHandler} icon={icon} label={label} />
}
