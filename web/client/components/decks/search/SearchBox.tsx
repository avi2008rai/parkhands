import React, { useMemo } from 'react'
import { useRouter } from 'next/router'

import routes from 'common/routes'
import { useFilters } from 'components/hooks/useFilters'
import GeoSearchBox from 'components/search/GeoSearchBox'
import { useSearchResult } from 'components/hooks/useSearchResult'
import { useGoogleMapsLoading } from 'components/hooks/useGoogleMapsLoading'

import SearchInput from './SearchInput'

export default function SearchBox() {
  const router = useRouter()
  const { loaded } = useGoogleMapsLoading()
  const { setResult, clearResult } = useSearchResult()
  const { geometry } = useFilters()

  const onPlacesChanged = (results: google.maps.places.PlaceResult[]) => {
    if (results) {
      const [result] = results
      const location = result.geometry?.location
      const formattedAddress = result.formatted_address || result.name
      if (location && formattedAddress) {
        const searchMapView = {
          lat: location.lat(),
          lng: location.lng(),
          zoom: 15, // TODO: Make it dependant on the category of address
        }
        setResult({ mapView: searchMapView, formattedAddress })

        // Redirect to dashboard with the chosen location
        if (router.pathname !== routes.dashboard && router.pathname !== '/[location]') {
          const route = routes.findLocation(searchMapView)
          router.push(route.href, route.as)
        }
      }
    }
  }

  const bounds = useMemo(() => {
    if (geometry && geometry.sw && geometry.ne) {
      return new google.maps.LatLngBounds(geometry.sw, geometry.ne)
    }
  }, [geometry])

  if (!loaded) {
    return null
  }

  return (
    <GeoSearchBox
      bounds={bounds}
      onPlacesChanged={onPlacesChanged}
      searchInput={<SearchInput onClear={() => clearResult()} />}
      loadingPlaceholder={null}
    />
  )
}
