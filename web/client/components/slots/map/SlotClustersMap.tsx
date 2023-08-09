import _ from 'lodash'
import { Alert } from '@material-ui/lab'
import { GoogleMap, Marker } from '@react-google-maps/api'
import React, { useRef, useCallback, useEffect, useMemo } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { LinearProgress, useMediaQuery, Theme } from '@material-ui/core'

import { GoogleMapsTheme } from 'lib/maps/utils'
import { useSidekick } from 'components/hooks/useSidekick'
import { useGoogleMapsLoading } from 'components/hooks/useGoogleMapsLoading'
import { useGoogleMapsInstance } from 'components/hooks/useGoogleMapsInstance'
import { useSlots, isCluster } from 'components/hooks/useSlots'
import { useMapCenter } from 'components/hooks/useMapCenter'
import { useSelectedSlot } from 'components/hooks/useSelectedSlot'
import { useSearchResult } from 'components/hooks/useSearchResult'
import { useCurrentPosition } from 'components/hooks/useCurrentPosition'
import { useFilters, GeometryFilter } from 'components/hooks/useFilters'

import ClusterMarker from './ClusterMarker'
import CurrentPositionMarker from './CurrentPositionMarker'
import MyLocationButton from './MyLocationButton'
import SearchResultsButton from './SearchResultsButton'
import SlotMarker from './SlotMarker'

const useStyles = makeStyles(() =>
  createStyles({
    map: {
      // Take all the available space, but don't use height 100%, because of flexbox and safari - https://stackoverflow.com/questions/27208987/google-maps-height-issue-with-css-flexbox-model
      position: 'absolute',
      top: '0',
      left: '0',
      bottom: '0',
      right: '0',
    },
  }),
)

export default function SlotClustersMap() {
  const classes = useStyles()
  const { slots, setZoom, zoom } = useSlots()
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
  const { loaded, error } = useGoogleMapsLoading()
  const { setMap } = useGoogleMapsInstance()
  const { clearSelection: clearSelectedSlot } = useSelectedSlot()
  const { flagLocation } = useSearchResult()
  const { mapCenterView, setMapCenterView } = useMapCenter()
  const googleMap = useRef<google.maps.Map>()
  const dragging = useRef<boolean>(false)
  const { setGeometryFilter } = useFilters()
  const { primary: primaryDeck, close: closeDecks } = useSidekick()

  const showPolygon = useMemo(() => {
    return zoom >= 18
  }, [zoom])

  const throttledSetGeometryFilter = useCallback(
    _.throttle((filter: GeometryFilter) => {
      setGeometryFilter(filter)
    }, 2200),
    [],
  )
  const updateGeometryFilter = useCallback(
    (googleMap: google.maps.Map) => {
      const bounds = googleMap.getBounds()
      if (bounds) {
        const center = bounds.getCenter()
        const corner = bounds.getNorthEast()
        const distance = google.maps.geometry.spherical.computeDistanceBetween(center, corner) // ref: https://developers.google.com/maps/documentation/javascript/reference/geometry#spherical.computeDistanceBetween
        const polygon = [
          [bounds.getNorthEast().lng(), bounds.getNorthEast().lat()],
          [bounds.getNorthEast().lng(), bounds.getSouthWest().lat()],
          [bounds.getSouthWest().lng(), bounds.getSouthWest().lat()],
          [bounds.getSouthWest().lng(), bounds.getNorthEast().lat()],
          [bounds.getNorthEast().lng(), bounds.getNorthEast().lat()],
        ] as [number, number][] // cast to narrower type. We know what we are doing :D
        throttledSetGeometryFilter({
          lat: center.lat(),
          lng: center.lng(),
          distance,
          polygon,
          ne: bounds.getNorthEast(),
          sw: bounds.getSouthWest(),
          bounds: bounds.toJSON(),
        })
      }
    },
    [throttledSetGeometryFilter],
  )

  const mapClickHandler = useCallback(() => {
    // Deselect selected slot
    clearSelectedSlot()
    if (mobile && primaryDeck) {
      closeDecks()
    }
  }, [mobile, primaryDeck, closeDecks, clearSelectedSlot])

  const [position] = useCurrentPosition()
  useEffect(() => {
    // Don't move the map center when there is a search location.
    // This prevents an unwanted moving of the map when coming in
    // the app with location query.
    //
    // Don't move the map if the useDeviceLocation flag is not raised.
    // This allows for per call control(setMapCenter) of the device location
    // map centering.
    if (position && !flagLocation && mapCenterView.useDeviceLocation) {
      setMapCenterView({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    }
  }, [position])

  if (!loaded) {
    return <LinearProgress color="secondary" />
  }
  if (error) {
    return <Alert severity="warning">{error.message}</Alert>
  }
  return (
    <>
      <GoogleMap
        id="map-component"
        center={mapCenterView}
        zoom={mapCenterView.zoom}
        mapContainerClassName={classes.map}
        onLoad={(map: google.maps.Map) => {
          googleMap.current = map
          setMap(map)
        }}
        onClick={mapClickHandler}
        onZoomChanged={() => {
          console.log('zoom changed to: ', googleMap.current?.getZoom())
          const zoom = googleMap.current?.getZoom()
          if (zoom) {
            setZoom(zoom)
          }
        }}
        onDragStart={() => {
          dragging.current = true
        }}
        onDragEnd={() => {
          dragging.current = false
          if (googleMap.current && !dragging.current) {
            updateGeometryFilter(googleMap.current)
          }
        }}
        onBoundsChanged={() => {
          if (googleMap.current && !dragging.current) {
            updateGeometryFilter(googleMap.current)
          }
        }}
        options={{
          // ref: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
          disableDefaultUI: true,
          gestureHandling: 'greedy',
          zoomControl: !mobile,
          styles: GoogleMapsTheme,
          minZoom: 3,
        }}>
        {_.map(slots, (slot) =>
          isCluster(slot) ? (
            <ClusterMarker key={slot.properties.cluster_id} clusterPoint={slot} />
          ) : (
            <SlotMarker key={slot.properties.id} slotPoint={slot} showPolygon={showPolygon} />
          ),
        )}
        {flagLocation && (
          <Marker
            key="search-destination"
            position={{
              lat: flagLocation.lat,
              lng: flagLocation.lng,
            }}
            icon={{
              url: '/static/destination-marker.svg',
              size: new google.maps.Size(43, 46),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(9, 46),
            }}
          />
        )}
        <CurrentPositionMarker />
      </GoogleMap>
      <SearchResultsButton />
      <MyLocationButton />
    </>
  )
}
