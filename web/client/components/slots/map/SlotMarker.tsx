import _ from 'lodash'
import React, { useCallback, useMemo } from 'react'
import { Marker, Polygon } from '@react-google-maps/api'
import { useMediaQuery, Theme } from '@material-ui/core'

import { colors } from 'common/theme'
import { SlotStatusT } from 'gql/schema'
import { useSelectedSlot, GenericSlot } from 'components/hooks/useSelectedSlot'
import { SlotPoint, StaticSlotPoint } from 'pages/api/slots/find'
import { isStaticSlot } from 'components/hooks/useSlots'

type SlotMarkerProps = {
  slotPoint: SlotPoint | StaticSlotPoint
  showPolygon?: boolean
}
export default function SlotMarker({ slotPoint, showPolygon = false }: SlotMarkerProps) {
  const { slot: selectedSlot, selectSlot } = useSelectedSlot()
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'))
  const {
    geometry,
    properties: { id, status, booked, inWorkingHours, inAmenities, shape },
  } = slotPoint
  const isStatic = isStaticSlot(slotPoint)
  const clickHandler = useCallback(() => {
    if (isStatic) {
      selectSlot({ slot: slotPoint.properties as GenericSlot, preselected: xs, centerMap: xs })
    } else {
      selectSlot({ slotId: id, preselected: xs, centerMap: xs })
    }
  }, [xs, id, selectSlot, isStatic])
  const location = useMemo(
    () => ({
      lng: geometry.coordinates[0],
      lat: geometry.coordinates[1],
    }),
    [geometry],
  )

  const iconUrl = useMemo(() => {
    if (id && id === selectedSlot?.id) {
      return '/static/parkhands-marker-selected.png'
    }
    if (isStatic) {
      return '/static/parkhands-marker-static.png'
    }
    if (status === SlotStatusT.Disabled) {
      return '/static/parkhands-marker-disabled.png'
    }
    if (!inWorkingHours || !inAmenities) {
      return '/static/parkhands-marker-disabled.png'
    }
    if (booked) {
      return '/static/parkhands-marker-busy.png'
    }
    return '/static/parkhands-marker.png'
  }, [id, status, booked, inWorkingHours, inAmenities, selectedSlot, isStatic])

  const icon = useMemo((): google.maps.Icon => {
    return {
      // ref: https://developers.google.com/maps/documentation/javascript/markers#complex_icons
      url: iconUrl,
      size: new google.maps.Size(24, 24),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(6, 24),
    }
  }, [iconUrl])

  return (
    <>
      {showPolygon &&
        shape &&
        !_.isEmpty(shape.coordinates) &&
        _.map(shape?.coordinates, (coordinate) => {
          return (
            <Polygon
              key={coordinate.join('|')}
              options={{
                strokeColor: colors.contrast,
                strokeOpacity: 0.85,
                fillColor: colors.contrast,
                fillOpacity: 0.1,
              }}
              paths={_.map(coordinate, ([lng, lat]) => ({ lat, lng }))}
            />
          )
        })}
      <Marker position={location} onClick={clickHandler} icon={icon} />
    </>
  )
}
