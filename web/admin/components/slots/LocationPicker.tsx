import { isEqual } from 'lodash'
import getConfig from 'next/config'
import { Alert } from '@material-ui/lab'
import { useUpdateEffect } from 'react-use'
import { useFormContext } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { LinearProgress, TextField, FormHelperText } from '@material-ui/core'
import {
  GoogleMap,
  useLoadScript,
  StandaloneSearchBox,
  DrawingManager,
  Polygon as PolygonShape,
  Polyline as PolylineShape,
} from '@react-google-maps/api'
import * as geolib from 'geolib'
import { Polygon } from 'geojson'
import { GoogleMapsTheme } from 'lib/maps/utils'
import { useUser } from 'components/hooks/useUser'
import { useTimezone } from 'components/google-maps/useTimezone'
import { useCurrentPosition } from 'components/hooks/useCurrentPosition'
import { crs } from 'gql/schema'
import { colors } from 'common/theme'
const config = getConfig().publicRuntimeConfig

const [defaultZoom, pointedZoom] = [18, 20]
export const defaultPosition: google.maps.LatLngLiteral = { lng: 13.406066, lat: 52.519563 }

const useStyles = makeStyles((theme) => ({
  addressInput: { marginBottom: theme.spacing(2) },
}))

const libraries = ['places', 'drawing', 'geometry']

type LocationPickerProps = { useFormPosition?: boolean }

export default function LocationPicker({ useFormPosition = false }: LocationPickerProps) {
  const { role } = useUser()
  const classes = useStyles()
  const { errors, setValue, watch } = useFormContext()
  const { retrieveTimezone, timezone } = useTimezone()
  const form = watch(['id', 'lng', 'lat', 'address', 'name', 'timezone', 'shape', 'waypoints'])
  const googleMap = useRef<google.maps.Map>()
  const [currentPosition] = useCurrentPosition()
  const startAddress = (form.address as unknown) as google.maps.GeocoderResult
  const startPosition = useMemo<google.maps.LatLngLiteral>(() => {
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
  }, [currentPosition])

  const [bounds, setBounds] = useState<google.maps.LatLngBounds>()
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>()
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config.GOOGLE_MAPS_API_KEY,
    libraries,
  })
  const [position, setPosition] = useState<google.maps.LatLngLiteral>(startPosition)
  const [searchResultPosition, setSearchResultPosition] = useState<google.maps.LatLngLiteral>()
  const [address, setAddress] = useState<google.maps.GeocoderResult | null>(startAddress)
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder>()
  const [shape, setPolygonPaths] = useState<any>([])

  const [polygonCoordinatesObject, setPolygonCoordinatesObject]: any = useState(null)
  const [polylineCoordinatesObject, setPolylineCoordinatesObject]: any = useState(null)

  const [polygonRef, setPolygonRef]: any = useState(null)
  const [polylineRef, setPolylineRef]: any = useState(null)

  const polyOptions = {
    strokeColor: colors.polyStrokeColor,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: colors.polyFillColor,
    fillOpacity: 0.5,
    editable: true,
    draggable: true,
    visible: true,
  }

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
    setValue('address', address)
  }

  const onPlacesChanged = () => {
    const results = searchBox?.getPlaces()
    if (results) {
      const [result] = results
      const location = result?.geometry?.location
      if (location) {
        setPosition(location?.toJSON())
        setSearchResultPosition(location?.toJSON())
      }
    }
  }

  const onOverlaycomplete = ({ type, overlay }: any) => {
    if (typeof overlay.getPath === 'function' && overlay.getPath().getLength()) {
      setShapeCoordinates(overlay, type)
    }
  }

  //On load functions for Polygon and Polyline
  const onPolygonLoad = (polygon: any) => {
    setPolygonRef(polygon)
    setShapeCoordinates(polygon, 'polygon')
  }

  const onPolylineLoad = (polyline: any) => {
    setPolylineRef(polyline)
  }

  // On MouseUp functions for Polygon and Polyline
  const onPolygonMouseUp = () => {
    setShapeCoordinates(polygonRef, 'polygon')
  }

  const onPolylineMouseUp = () => {
    setShapeCoordinates(polylineRef, 'polyline')
  }

  const setShapeCoordinates = (shapeRef: any, type: string) => {
    let polyCenterPosition
    const newPaths: any = []
    const ployShapes: Polygon = {
      type: 'Polygon',
      coordinates: [],
      // @ts-ignore Geo CRS
      crs,
    }

    if (type === 'polygon') {
      for (let i = 0; i < shapeRef.getPath().getLength(); i++) {
        const latLng = shapeRef.getPath().getAt(i).toUrlValue(6).split(',')
        newPaths.push([latLng[0], latLng[1]])
      }

      ployShapes.coordinates.push(newPaths)
      polyCenterPosition = geolib.getCenterOfBounds(newPaths)

      const setPolyCenter = {
        polyCenter: {
          lng: polyCenterPosition.latitude,
          lat: polyCenterPosition.longitude,
        },
      }

      setPolygonPaths(ployShapes)
      setValue('shape', ployShapes)
      setValue('slotDimensions', setPolyCenter)
    } else if (type === 'polyline') {
      for (let i = 0; i < shapeRef.getPath().getLength(); i++) {
        const latLng = shapeRef.getPath().getAt(i).toUrlValue(6).split(',')
        newPaths.push([parseFloat(latLng[0]), parseFloat(latLng[1])])
      }
      setValue('waypoints', newPaths)
    }
  }

  const frameCoordinates = (coordinatesObj: any) => {
    let coordinatePoints: any = []

    coordinatesObj.forEach((element: any) => {
      coordinatePoints.push({
        lat: element[0],
        lng: element[1],
      })
    })

    return coordinatePoints
  }

  useEffect(() => {
    if (form.shape && form.shape.geojson.coordinates.length > 0) {
      setPolygonCoordinatesObject(frameCoordinates(form.shape.geojson.coordinates[0]))
    }

    if (form.waypoints && form.waypoints.length > 0) {
      setPolylineCoordinatesObject(frameCoordinates(form.waypoints))
    }
  }, [])

  useEffect(() => {
    position && onPositionChange(position)
  }, [position])

  useEffect(() => {
    address && onAddressChange(address)
  }, [address])

  if (!isLoaded) {
    return <LinearProgress color="secondary" />
  }
  if (loadError) {
    return <Alert severity="warning">{loadError.message}</Alert>
  }

  return (
    <>
      {address && (
        <TextField
          className={classes.addressInput}
          value={address.formatted_address}
          fullWidth
          variant="outlined"
        />
      )}
      {role.isSuperAdmin && (
        <StandaloneSearchBox
          bounds={bounds}
          onLoad={setSearchBox}
          onPlacesChanged={onPlacesChanged}>
          <TextField
            className={classes.addressInput}
            placeholder="Search"
            autoComplete="off"
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            // value={address.formatted_address}
            fullWidth
            variant="outlined"
          />
        </StandaloneSearchBox>
      )}
      {Boolean(errors.location) && <FormHelperText error>Select location</FormHelperText>}
      <GoogleMap
        id="map-component"
        center={searchResultPosition || startPosition}
        zoom={isEqual(startPosition, defaultPosition) ? defaultZoom : pointedZoom}
        mapContainerStyle={{ height: '450px' }}
        options={{
          // Reference: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
          streetViewControl: true,
          disableDefaultUI: false,
          mapTypeId: google.maps.MapTypeId.SATELLITE,
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
          if (!role.isSuperAdmin) {
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
        {polygonCoordinatesObject ? (
          <PolygonShape
            path={polygonCoordinatesObject}
            options={polyOptions}
            onLoad={onPolygonLoad}
            onMouseUp={onPolygonMouseUp}
          />
        ) : null}
        {polylineCoordinatesObject ? (
          <PolylineShape
            path={polylineCoordinatesObject}
            options={polyOptions}
            onLoad={onPolylineLoad}
            onMouseUp={onPolylineMouseUp}
          />
        ) : null}
        <DrawingManager
          options={{
            drawingControlOptions: {
              drawingModes: [
                google.maps.drawing.OverlayType.POLYGON,
                google.maps.drawing.OverlayType.POLYLINE,
              ],
              position: google.maps.ControlPosition.RIGHT_BOTTOM,
            },

            polygonOptions: polyOptions,
            polylineOptions: polyOptions,
          }}
          onOverlayComplete={onOverlaycomplete}></DrawingManager>
        )
      </GoogleMap>
    </>
  )
}
