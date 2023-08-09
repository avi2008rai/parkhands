import _ from 'lodash'
import { useEffect, useCallback } from 'react'

import { useSlots } from 'components/hooks/useSlots'
import { useFilters } from 'components/hooks/useFilters'
import { useFetch } from 'components/hooks/useFetch'
import { SlotClusterResponse, FindSlotVariables } from 'pages/api/slots/find'

const NO_ACTIONS_INTERVAL = 1000 // in ms
const MAX_WAIT_FOR_FETCH = 10000 // in ms

export default function LoadSlots() {
  const { zoom, setSlots } = useSlots()
  const {
    geometry,
    time: { start, end },
    filterAmenities,
    filterCategories,
    filterVehicleSize,
  } = useFilters()

  const [fetchSlots, { error, data }] = useFetch<SlotClusterResponse, FindSlotVariables>({
    method: 'POST',
    baseUrl: '/api/slots/find',
  })

  useEffect(() => {
    if (data) {
      setSlots(data.slots || [])
    }
  }, [data, setSlots])
  const debouncedFetch = useCallback(
    _.debounce(
      (params: FindSlotVariables) => {
        fetchSlots({
          body: params,
        })
      },
      NO_ACTIONS_INTERVAL,
      { maxWait: MAX_WAIT_FOR_FETCH },
    ),
    [fetchSlots],
  )

  // Send requests only when there haven't been a change in the filters
  // in the last NO_ACTIONS_INTERVAL milliseconds or after MAX_WAIT_FOR_FETCH
  // milliseconds have elapsed.
  // MAX_WAIT_FOR_FETCH is just to cover the cases there is a loop somehow.
  useEffect(() => {
    if (!error && geometry?.lat && geometry?.lng) {
      debouncedFetch({
        latitude: geometry.lat,
        longitude: geometry.lng,
        startTime: start,
        endTime: end,
        slotAmenities: _.union(filterAmenities, filterCategories),
        vehicleSizes: filterVehicleSize ? [filterVehicleSize] : [],
        distance: Math.round(geometry?.distance || 1000),
        totalLimit: 10000,
        bounds: geometry.bounds,
        zoom,
      })
    }
    return () => debouncedFetch.cancel()
  }, [
    error,
    geometry,
    start,
    end,
    filterAmenities,
    filterCategories,
    filterVehicleSize,
    zoom,
    debouncedFetch,
  ])

  return null
}
