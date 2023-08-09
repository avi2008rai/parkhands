import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react'

import { useMapCenter } from 'components/hooks/useMapCenter'

import { ParsedLocation } from '.'
import { useQueryLocation } from './useQueryLocation'
import { useGoogleMapsLoading } from './useGoogleMapsLoading'

type SearchResultContext = {
  flagLocation: ParsedLocation
  formattedAddress: string
  setResult: ({
    mapView,
    formattedAddress,
  }: {
    mapView: ParsedLocation
    formattedAddress: string
  }) => void
  clearResult: () => void
}

const DefaultContext = (): SearchResultContext => {
  const { location } = useQueryLocation()
  const { loaded } = useGoogleMapsLoading()
  const [flagLocation, setFlagLocation] = useState<ParsedLocation>(location)
  const [formattedAddress, setFormattedAddress] = useState('')
  const { setMapCenterView } = useMapCenter()

  useEffect(() => {
    if (location && loaded) {
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ location }, (results) => {
        if (results.length > 0) {
          setFormattedAddress(results[0].formatted_address)
        }
      })
    }
  }, [location, loaded])

  return {
    flagLocation,
    formattedAddress,
    setResult: ({ mapView, formattedAddress }) => {
      setFlagLocation(mapView)
      if (mapView?.lat && mapView?.lng) {
        setMapCenterView(mapView)
      }
      setFormattedAddress(formattedAddress)
    },
    clearResult: () => {
      setFlagLocation(null)
      setFormattedAddress('')
    },
  }
}

const SearchResultContext = createContext<SearchResultContext>(null as any)

export function SearchResultProvider({ children }: { children?: ReactNode }) {
  const { Provider } = SearchResultContext
  return <Provider value={DefaultContext()}>{children}</Provider>
}

export function useSearchResult() {
  return useContext(SearchResultContext)
}
