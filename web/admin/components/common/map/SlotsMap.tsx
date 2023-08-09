import _ from 'lodash'
import React from 'react'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { Alert } from '@material-ui/lab'
import { SlotsListQuery } from 'gql/schema'
import { LinearProgress } from '@material-ui/core'
import { Clusterer } from '@react-google-maps/marker-clusterer'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'

import routes from 'common/routes'
import { GoogleMapsTheme } from 'lib/maps/utils'

import SlotMarkerClusterer from './SlotMarkerClusterer'
import SlotsMarker from './SlotMarker'

const config = getConfig().publicRuntimeConfig
const defaultPosition = {
  lng: 10.542015,
  lat: 52.264537,
}
const defaultZoom = 6

const libraries = ['places']

export default function SlotsMap({ slotsList }: SlotsListQuery) {
  const router = useRouter()
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config.GOOGLE_MAPS_API_KEY,
    libraries,
  })

  if (!isLoaded) {
    return <LinearProgress color="secondary" />
  }
  if (loadError) {
    return <Alert severity="warning">{loadError.message}</Alert>
  }
  return (
    <GoogleMap
      id="map-component"
      center={defaultPosition}
      zoom={defaultZoom}
      mapContainerStyle={{ height: '35rem' }}
      options={{
        // Reference: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
        streetViewControl: false,
        disableDefaultUI: true,
        styles: GoogleMapsTheme,
      }}>
      <SlotMarkerClusterer>
        {(clusterer: Clusterer) =>
          slotsList?.map((slot) => (
            <SlotsMarker
              key={slot.id}
              slot={slot}
              clusterer={clusterer}
              onClick={() => {
                const { href, as } = routes.slots.manageById({ id: slot.id })
                router.push(href, as)
              }}
            />
          ))
        }
      </SlotMarkerClusterer>
    </GoogleMap>
  )
}
