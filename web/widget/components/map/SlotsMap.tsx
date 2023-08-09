import map from 'lodash/map'
import groupBy from 'lodash/groupBy'
import getConfig from 'next/config'
import throttle from 'lodash/throttle'
import { Alert } from '@material-ui/lab'
import { LinearProgress } from '@material-ui/core'
import { Clusterer } from '@react-google-maps/marker-clusterer'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React, { useCallback, useRef, useState, useMemo } from 'react'
import { useLoadScript, GoogleMap } from '@react-google-maps/api'

const {
  publicRuntimeConfig: { GOOGLE_MAPS_API_KEY },
} = getConfig()

import { GoogleMapsTheme } from 'lib/maps/utils'
import { useIsPremiumUser } from 'components/hooks/useIsPremiumUser'
import { useSlots } from 'components/hooks/useSlots'
import { useSelectedSlot } from 'components/hooks/useSelectedSlot'
import SlotCard from 'components/common/SlotCard'
import SlotMarker from 'components/common/SlotMarker'
import InvalidSubscriptionOverlay from 'components/common/InvalidSubscriptionOverlay'

import SlotMarkerClusterer from './SlotMarkerClusterer'
import { useBusinessLocations } from 'components/hooks/useBusinessLocations'
import BusinessMarker from 'components/common/BusinessMarker'

type LocationFilters = { lat: number; lng: number; distance: number }

const libraries = ['geometry', 'places']
// geometry - for utils for measuring distance between points
// places - for the search functionality

export const defaultPosition = {
  lng: 10.542015,
  lat: 51.165691,
}
type StyleProps = {
  isPremiumUser: boolean
}
const useStyles = makeStyles(() =>
  createStyles({
    widgetContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    mapContainer: ({ isPremiumUser }: StyleProps) => ({
      width: '100%',
      height: '100%',
      filter: isPremiumUser ? 'none' : 'blur(4px) grayscale(1)',
    }),
  }),
)
type SlotsMapParams = {
  center: google.maps.LatLngLiteral
  zoom: number
  providerId: string
}
export default function SlotsMap({ center, zoom = 6, providerId }: SlotsMapParams) {
  const googleMap = useRef<google.maps.Map>()
  const dragging = useRef<boolean>(false)
  const [locationFilters, setLocationFilters] = useState<LocationFilters>({
    lat: center?.lat,
    lng: center?.lng,
    distance: 1000,
  })
  const { slot: selectedSlot, selectSlot, clearSelection } = useSelectedSlot()
  const [isPremiumUser] = useIsPremiumUser(providerId)
  const classes = useStyles({ isPremiumUser })
  // Memo the variables so we don't overwhelm the useSlots hook.
  const slotsVariables = useMemo(
    () => ({
      latitude: locationFilters.lat,
      longitude: locationFilters.lng,
      distance: locationFilters.distance,
      ownerId: providerId,
      totalLimit: 1000,
    }),
    [locationFilters, providerId],
  )
  const businessVariables = useMemo(
    () => ({
      payload: {
        latitude: locationFilters.lat,
        longitude: locationFilters.lng,
        distance: locationFilters.distance,
        ownerId: providerId,
      },
    }),
    [locationFilters, providerId],
  )

  const [slots] = useSlots(slotsVariables)
  const [businessListings] = useBusinessLocations(businessVariables)

  const slotsByParkingSpace = useMemo(() => {
    return groupBy(slots, 'parkingSpaceId')
  }, [slots])

  const throttledSetLocationFilters = useCallback(
    throttle((locationFilters: LocationFilters) => {
      setLocationFilters(locationFilters)
    }, 2200),
    [setLocationFilters],
  )
  const updateLocationFilter = useCallback(
    (googleMap: google.maps.Map) => {
      const bounds = googleMap.getBounds()
      if (bounds) {
        const center = bounds.getCenter()
        const corner = bounds.getNorthEast()
        const distance = Math.round(
          google.maps.geometry.spherical.computeDistanceBetween(center, corner),
        ) // ref: https://developers.google.com/maps/documentation/javascript/reference/geometry#spherical.computeDistanceBetween
        // Round to convert the float to int, because GraphQL expects int.
        throttledSetLocationFilters({
          lat: center.lat(),
          lng: center.lng(),
          distance,
        })
      }
    },
    [throttledSetLocationFilters],
  )

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  })

  if (!GOOGLE_MAPS_API_KEY) {
    return <div>Error initializing the map. No googleMapsApiKey config provided.</div>
  }

  if (!isLoaded) {
    return <LinearProgress color="secondary" />
  }
  if (loadError) {
    return <Alert severity="warning">{loadError.message}</Alert>
  }

  return (
    <div className={classes.widgetContainer}>
      <GoogleMap
        id="map-component"
        center={center}
        zoom={zoom}
        mapContainerClassName={classes.mapContainer}
        options={{
          // Reference: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
          streetViewControl: false,
          disableDefaultUI: true,
          styles: GoogleMapsTheme,
          draggable: isPremiumUser,
          disableDoubleClickZoom: !isPremiumUser,
          minZoom: 12,
        }}
        onLoad={(map: google.maps.Map) => {
          googleMap.current = map
        }}
        onDragStart={() => {
          dragging.current = true
        }}
        onDragEnd={() => {
          dragging.current = false
          if (googleMap.current && !dragging.current) {
            updateLocationFilter(googleMap.current)
          }
        }}
        onBoundsChanged={() => {
          if (googleMap.current && !dragging.current) {
            updateLocationFilter(googleMap.current)
          }
        }}>
        {map(slotsByParkingSpace, (slots, parkingSpace) => {
          const hasParkingSpace = parkingSpace !== 'null'
          return (
            <SlotMarkerClusterer
              key={parkingSpace}
              averageCenter={hasParkingSpace}
              minimumClusterSize={hasParkingSpace ? slots.length : 5}>
              {(clusterer: Clusterer) =>
                slots?.map((slot) => (
                  <SlotMarker
                    key={slot.id}
                    position={{
                      lat: slot.location.latitude,
                      lng: slot.location.longitude,
                    }}
                    clusterer={clusterer}
                    selected={slot.id === selectedSlot?.id}
                    clickable={isPremiumUser}
                    onClick={() => selectSlot({ slotId: slot.id })}
                  />
                ))
              }
            </SlotMarkerClusterer>
          )
        })}
        {businessListings?.map((business) => (
          <BusinessMarker key={business.id} business={business} />
        ))}
      </GoogleMap>
      {selectedSlot && <SlotCard slot={selectedSlot} onClose={() => clearSelection()} />}
      {!isPremiumUser && <InvalidSubscriptionOverlay />}
    </div>
  )
}
