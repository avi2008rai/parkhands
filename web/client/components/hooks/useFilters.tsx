import { addHours } from 'date-fns'
import React, { useState, createContext, useContext, ReactNode, useMemo } from 'react'

import { getDateRoundedToNextMinutes } from 'common/utils/time'

export type GeometryFilter = {
  lat: number
  lng: number
  distance: number
  polygon: [number, number][]
  sw: google.maps.LatLng
  ne: google.maps.LatLng
  bounds: google.maps.LatLngBoundsLiteral
}

type TimeFilter = {
  start: Date
  end: Date
}

type FiltersContext = {
  geometry?: GeometryFilter
  time: TimeFilter
  filterAmenities: string[]
  filterCategories: string[]
  filterVehicleSize: string
  searchBox: boolean
  popOver: boolean
  setGeometryFilter: (geometry: GeometryFilter) => void
  setStartTime: (start: Date) => void
  setEndTime: (end: Date) => void
  openSearchBox: () => void
  closeSearchBox: () => void
  openPopOver: () => void
  closePopOver: () => void
  setFilterAmenities: (amenities: string[]) => void
  setFilterCategories: (categories: string[]) => void
  setFilterVehicleSize: (vehicleSize: string) => void
}

const DefaultContext = (): FiltersContext => {
  const [geometry, setGeometry] = useState<GeometryFilter>()
  const nextMinutes = useMemo(() => getDateRoundedToNextMinutes(new Date(), 10), [])
  const [start, setStart] = useState<Date>(nextMinutes)
  const [end, setEnd] = useState<Date>(addHours(nextMinutes, 1))
  const [filterAmenities, setFilterAmenities] = useState<string[]>([])
  const [filterCategories, setFilterCategories] = useState<string[]>([])
  const [filterVehicleSize, setFilterVehicleSize] = useState<string>('')
  const [searchBox, setSearchBox] = useState(false)
  const [popOver, setPopOver] = useState(false)
  return {
    time: { start, end },
    setStartTime: (start: Date) => setStart(start),
    setEndTime: (end: Date) => setEnd(end),
    geometry,
    setGeometryFilter: (geometry: GeometryFilter) => setGeometry(geometry),
    searchBox,
    openSearchBox: () => setSearchBox(true),
    closeSearchBox: () => setSearchBox(false),
    popOver,
    openPopOver: () => setPopOver(true),
    closePopOver: () => setPopOver(false),
    filterAmenities,
    setFilterAmenities,
    filterCategories,
    setFilterCategories,
    filterVehicleSize,
    setFilterVehicleSize,
  }
}

const FiltersContext = createContext<FiltersContext>(null as any)

export function FiltersProvider({ children }: { children?: ReactNode }) {
  const { Provider } = FiltersContext
  return <Provider value={DefaultContext()}>{children}</Provider>
}

export function useFilters() {
  return useContext(FiltersContext)
}
