export type LatLng = { lat: number; lng: number }
export type MapZoom = { zoom: number }
export type MapView = LatLng & MapZoom
export type MapViewPartial = LatLng & Partial<MapZoom>
export type MapViewWithDeviceLocationFlag = MapView & {
  useDeviceLocation?: boolean
}
export type MapViewWithDeviceLocationFlagPartial = MapViewPartial & {
  useDeviceLocation?: boolean
}
export type ParsedLocation = MapView | null
