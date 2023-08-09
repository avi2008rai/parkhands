import _ from 'lodash'
import { Alert } from '@material-ui/lab'
import { useUpdateEffect } from 'react-use'
import { useFormContext } from 'react-hook-form'
import { GoogleMap, Marker } from '@react-google-maps/api'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { LinearProgress, FormHelperText, Card } from '@material-ui/core'

import { GoogleMapsTheme } from 'lib/maps/utils'
import { useTimezone } from 'components/google-maps/useTimezone'
import LoadGoogleMaps from 'components/google-maps/LoadGoogleMaps'
import { useCurrentPosition } from 'components/hooks/useCurrentPosition'
import { useGoogleMapsLoading } from 'components/hooks/useGoogleMapsLoading'
import { useUser } from 'components/hooks/useUser'

import MapSearchBox from './SearchBox'

const defaultZoom = 15
export const defaultPosition = { lng: 10.542015, lat: 52.264537 }

type LocationPickerProps = { useFormPosition?: boolean }

export default function LocationPicker({ useFormPosition = false }: LocationPickerProps) {
  const { loaded, error } = useGoogleMapsLoading()
  const { can } = useUser()
  const { retrieveTimezone, timezone } = useTimezone()
  const { errors, setValue, watch } = useFormContext()
  const form = watch(['id', 'lng', 'lat', 'address', 'name', 'timezone'])
  const googleMap = useRef<google.maps.Map>()

  const [currentPosition] = useCurrentPosition()
  const startAddress = (form.address as unknown) as google.maps.GeocoderResult
  const startPosition = useMemo((): google.maps.LatLngLiteral => {
    if (useFormPosition) {
      return { lat: form.lat, lng: form.lng }
    }
    if (currentPosition) {
      return {
        lat: currentPosition?.coords.latitude,
        lng: currentPosition?.coords.longitude,
      }
    }
    return defaultPosition
  }, [currentPosition, useFormPosition])

  const [position, setPosition] = useState<google.maps.LatLngLiteral>(startPosition)
  const [searchResultPosition, setSearchResultPosition] = useState<google.maps.LatLngLiteral>()
  const [address, setAddress] = useState<google.maps.GeocoderResult | null>(startAddress)
  const [bounds, setBounds] = useState<google.maps.LatLngBounds>()
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder>()

  useEffect(() => {
    // Fill initial timezone
    retrieveTimezone(startPosition)
  }, [])

  useUpdateEffect(() => {
    if (timezone?.timeZoneId && form.timezone !== timezone?.timeZoneId) {
      setValue('timezone', timezone?.timeZoneId)
    }
  }, [timezone])

  useUpdateEffect(() => {
    // Trigger only when position changes, no initial fetch trigger
    position && retrieveTimezone(position)
  }, [position])

  const onPositionChange = (position: google.maps.LatLngLiteral) => {
    setValue('lat', position.lat, true)
    setValue('lng', position.lng, true)

    geocoder?.geocode({ location: position }, (results) => {
      if (results) {
        const address = results[0]
        setAddress(address)
      } else {
        setAddress(null)
      }
    })
  }

  const onAddressChange = (address: google.maps.GeocoderResult) => {
    // Store geocoder address in slot
    setValue('address', address as any)

    // Set Slot name when user selects a location on the map (only if name is empty)
    if (_.isEmpty(form.name)) {
      setValue('name', address.formatted_address, true)
    }
  }

  const onPlacesChanged = (places: google.maps.places.PlaceResult[]) => {
    const [result] = places
    const location = result?.geometry?.location
    if (location) {
      setPosition(location?.toJSON())
      setSearchResultPosition(location?.toJSON())
    }
  }

  useEffect(() => {
    position && onPositionChange(position)
  }, [position])

  useEffect(() => {
    address && onAddressChange(address)
  }, [address])

  let picker = null
  if (!loaded) {
    picker = <LinearProgress color="secondary" />
  } else if (error) {
    picker = <Alert severity="warning">{error.message}</Alert>
  } else {
    picker = (
      <>
        {can.createSlots && <MapSearchBox bounds={bounds} onPlacesChanged={onPlacesChanged} />}
        {Boolean(errors.location) && <FormHelperText error>Select location</FormHelperText>}
        <Card variant="outlined">
          <GoogleMap
            id="map-component"
            center={searchResultPosition || startPosition} // move the map only on search results and on start position
            zoom={defaultZoom}
            mapContainerStyle={{ height: '450px' }}
            options={{
              // Reference: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
              streetViewControl: false,
              disableDefaultUI: true,
              gestureHandling: 'greedy',
              mapTypeId: google.maps.MapTypeId.HYBRID,
              styles: GoogleMapsTheme,
            }}
            onLoad={(map: google.maps.Map) => {
              googleMap.current = map
              const coder = new google.maps.Geocoder()
              setGeocoder(coder)
            }}
            onBoundsChanged={() => {
              if (googleMap.current) {
                const bounds = googleMap.current.getBounds()
                if (bounds) {
                  setBounds(bounds)
                }
              }
            }}
            onClick={(e: google.maps.MouseEvent) => {
              if (!can.createSlots) {
                // Disable edit of slot location for non-admins
                return
              }
              if (e.latLng !== null) {
                const pos = {
                  lng: e.latLng.lng(),
                  lat: e.latLng.lat(),
                }
                setPosition(pos)
              }
            }}>
            {position && (
              <Marker
                position={position}
                icon={{
                  // ref: https://developers.google.com/maps/documentation/javascript/markers#complex_icons
                  url: '/static/parkhands-marker.png',
                  size: new google.maps.Size(24, 24),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(6, 24),
                }}
              />
            )}
          </GoogleMap>
        </Card>
      </>
    )
  }

  return <LoadGoogleMaps>{picker}</LoadGoogleMaps>
}
