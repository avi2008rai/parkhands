import _ from 'lodash'
import React, { useState, useCallback, ReactElement, ReactNode } from 'react'
import { Alert } from '@material-ui/lab'
import { LinearProgress } from '@material-ui/core'
import { StandaloneSearchBox } from '@react-google-maps/api'

import { useGoogleMapsLoading } from 'components/hooks/useGoogleMapsLoading'

export type GeoSearchBoxProps = {
  onPlacesChanged: (places: google.maps.places.PlaceResult[]) => void
  bounds?: google.maps.LatLngBounds
  searchInput: ReactNode
  loadingPlaceholder?: ReactNode
}

export default function GeoSearchBox({
  onPlacesChanged,
  bounds,
  searchInput,
  loadingPlaceholder = <LinearProgress color="secondary" />,
}: GeoSearchBoxProps) {
  const { loaded, error } = useGoogleMapsLoading()
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>()

  const onPlacesChangedHandler = useCallback(() => {
    const results = searchBox?.getPlaces()
    if (results) {
      onPlacesChanged(results)
    }
  }, [searchBox])

  if (!loaded) {
    return <>{loadingPlaceholder}</> // With `loadingPlaceholder` only TS is not happy.
  }
  if (error) {
    return <Alert severity="warning">{error.message}</Alert>
  }

  return (
    <StandaloneSearchBox
      bounds={bounds}
      onLoad={setSearchBox}
      children={searchInput}
      onPlacesChanged={onPlacesChangedHandler}
    />
  )
}
