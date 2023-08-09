import React, { useState, createContext, useContext, ReactNode } from 'react'

import googleMapPanTo from 'common/utils/googleMapPanTo'

import { MapView, MapViewWithDeviceLocationFlag, MapViewWithDeviceLocationFlagPartial } from '.'
import { useQueryLocation } from './useQueryLocation'
import { useGoogleMapsInstance } from './useGoogleMapsInstance'

type MapCenterContext = {
  mapCenterView: MapViewWithDeviceLocationFlag
  setMapCenterView: (mapView: MapViewWithDeviceLocationFlagPartial) => void
  animateMapCenterView: (mapView: MapView) => void
}

const DefaultContext = (): MapCenterContext => {
  const { location } = useQueryLocation()
  const { map } = useGoogleMapsInstance()
  const [mapCenterView, setMapCenterView] = useState<MapViewWithDeviceLocationFlag>(
    location || {
      lng: 10.542015,
      lat: 52.264537,
      zoom: 17,
      useDeviceLocation: true,
    },
  )
  return {
    mapCenterView,
    setMapCenterView: (newMapView) => {
      if (typeof newMapView.zoom === 'number') {
        setMapCenterView(newMapView as MapViewWithDeviceLocationFlag)
      } else {
        setMapCenterView({
          lat: newMapView.lat,
          lng: newMapView.lng,
          zoom: mapCenterView.zoom,
          useDeviceLocation: !!newMapView.useDeviceLocation,
        })
      }
    },
    animateMapCenterView: (newMapView) => {
      if (map) {
        googleMapPanTo({
          map,
          destLatLng: new google.maps.LatLng(newMapView.lat, newMapView.lng),
          zoom: newMapView.zoom,
        })
      }
    },
  }
}

const MapCenterContext = createContext<MapCenterContext>(null as any)

export function MapCenterProvider({ children }: { children?: ReactNode }) {
  const { Provider } = MapCenterContext
  return <Provider value={DefaultContext()}>{children}</Provider>
}

export function useMapCenter() {
  return useContext(MapCenterContext)
}
