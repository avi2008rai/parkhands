// From https://stackoverflow.com/a/52763732

/**
 * Handy functions to project lat/lng to pixel
 * Extracted from: https://developers.google.com/maps/documentation/javascript/examples/map-coordinates
 **/
function project(latLng: google.maps.LatLng) {
  const TILE_SIZE = 256

  let siny = Math.sin((latLng.lat() * Math.PI) / 180)

  // Truncating to 0.9999 effectively limits latitude to 89.189. This is
  // about a third of a tile past the edge of the world tile.
  siny = Math.min(Math.max(siny, -0.9999), 0.9999)

  return new google.maps.Point(
    TILE_SIZE * (0.5 + latLng.lng() / 360),
    TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)),
  )
}

/**
 * Handy functions to project lat/lng to pixel
 * Extracted from: https://developers.google.com/maps/documentation/javascript/examples/map-coordinates
 **/
function getPixel(latLng: google.maps.LatLng, zoom: number) {
  const scale = 1 << zoom
  const worldCoordinate = project(latLng)
  return new google.maps.Point(
    Math.floor(worldCoordinate.x * scale),
    Math.floor(worldCoordinate.y * scale),
  )
}

/**
 * Given a map, return the map dimension (width and height)
 * in pixels.
 **/
function getMapDimensionsInPixels(map: google.maps.Map) {
  const zoom = map.getZoom()
  const bounds = map.getBounds()
  const southWestPixel = getPixel(bounds!.getSouthWest(), zoom)
  const northEastPixel = getPixel(bounds!.getNorthEast(), zoom)
  return {
    width: Math.abs(southWestPixel.x - northEastPixel.x),
    height: Math.abs(southWestPixel.y - northEastPixel.y),
  }
}

/**
 * Given a map and a destLatLng returns true if calling
 * map.panTo(destLatLng) will be smoothly animated or false
 * otherwise.
 *
 * optionalZoomLevel can be optionally be provided and if so
 * returns true if map.panTo(destLatLng) would be smoothly animated
 * at optionalZoomLevel.
 **/
function willAnimatePanTo(
  map: google.maps.Map,
  destLatLng: google.maps.LatLng,
  optionalZoomLevel?: number,
) {
  const dimensions = getMapDimensionsInPixels(map)

  const mapCenter = map.getCenter()
  optionalZoomLevel = !!optionalZoomLevel ? optionalZoomLevel : map.getZoom()

  const destPixel = getPixel(destLatLng, optionalZoomLevel)
  const mapPixel = getPixel(mapCenter, optionalZoomLevel)
  const diffX = Math.abs(destPixel.x - mapPixel.x)
  const diffY = Math.abs(destPixel.y - mapPixel.y)

  return diffX < dimensions.width && diffY < dimensions.height
}

/**
 * Returns the optimal zoom value when animating
 * the zoom out.
 *
 * The maximum change will be currentZoom - 3.
 * Changing the zoom with a difference greater than
 * 3 levels will cause the map to "jump" and not
 * smoothly animate.
 *
 * Unfortunately the magical number "3" was empirically
 * determined as we could not find any official docs
 * about it.
 **/
function getOptimalZoomOut(map: google.maps.Map, latLng: google.maps.LatLng, currentZoom: number) {
  if (willAnimatePanTo(map, latLng, currentZoom - 1)) {
    return currentZoom - 1
  } else if (willAnimatePanTo(map, latLng, currentZoom - 2)) {
    return currentZoom - 2
  } else {
    return currentZoom - 3
  }
}

type smoothlyAnimatePanToWorkaroundArgs = {
  map: google.maps.Map
  destLatLng: google.maps.LatLng
  zoom?: number
  optionalAnimationEndCallback?: () => void
}
/**
 * Given a map and a destLatLng, smoothly animates the map center to
 * destLatLng by zooming out until distance (in pixels) between map center
 * and destLatLng are less than map width and height, then panTo to destLatLng
 * and finally animate to restore the initial zoom.
 *
 * optionalAnimationEndCallback can be optionally be provided and if so
 * it will be called when the animation ends
 **/
function smoothlyAnimatePanToWorkaround({
  map,
  destLatLng,
  optionalAnimationEndCallback,
  zoom,
}: smoothlyAnimatePanToWorkaroundArgs) {
  const initialZoom = zoom || map.getZoom()
  console.log({ initialZoom, zoom })
  let listener: google.maps.MapsEventListener

  function zoomIn() {
    if (map.getZoom() < initialZoom) {
      map.setZoom(Math.min(map.getZoom() + 3, initialZoom))
    } else {
      google.maps.event.removeListener(listener)

      // here you should (re?)enable only the ui controls that make sense to your app
      map.setOptions({
        draggable: true,
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: false,
      })

      if (!!optionalAnimationEndCallback) {
        optionalAnimationEndCallback()
      }
    }
  }

  function zoomOut() {
    if (willAnimatePanTo(map, destLatLng)) {
      google.maps.event.removeListener(listener)
      listener = google.maps.event.addListener(map, 'idle', zoomIn)
      map.panTo(destLatLng)
    } else {
      map.setZoom(getOptimalZoomOut(map, destLatLng, map.getZoom()))
    }
  }

  // here you should disable all the ui controls that your app uses
  map.setOptions({
    draggable: false,
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
  })
  if (willAnimatePanTo(map, destLatLng)) {
    listener = google.maps.event.addListener(map, 'idle', zoomIn)
    map.panTo(destLatLng)
  } else {
    map.setZoom(getOptimalZoomOut(map, destLatLng, initialZoom))
    listener = google.maps.event.addListener(map, 'idle', zoomOut)
  }
}

type GoogleMapPanToArgs = {
  map: google.maps.Map
  destLatLng: google.maps.LatLng
  zoom?: number
}

export default function googleMapPanTo({ map, destLatLng, zoom }: GoogleMapPanToArgs) {
  if (willAnimatePanTo(map, destLatLng, zoom)) {
    map.panTo(destLatLng)
    if (zoom) {
      map.setZoom(zoom)
    }
  } else {
    smoothlyAnimatePanToWorkaround({ map, destLatLng, zoom })
  }
}
