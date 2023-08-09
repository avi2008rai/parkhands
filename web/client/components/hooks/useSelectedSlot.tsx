import { useRouter } from 'next/router'
import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react'

import { Dataset } from 'gql/utils'
import { useMapCenter } from 'components/hooks/useMapCenter'
import { SlotByIdQuery, useSlotByIdLazyQuery } from 'gql/schema'

import { MapView } from './index'
import { useSlots } from './useSlots'

export type Slot = NonNullable<SlotByIdQuery['slot']>
export type ReducedStaticSlot = Pick<Dataset.StaticSlot, 'id' | 'staticSpaceId' | 'static'> &
  Partial<Pick<Dataset.StaticSlot, 'location'>>
export type GenericSlot = Slot | ReducedStaticSlot

export function isSlot(point: GenericSlot): point is Slot {
  return (point as Slot).pricePerHour !== undefined
}
export function isStaticSlot(point: GenericSlot): point is Dataset.StaticSlot {
  return (point as Dataset.StaticSlot).static !== undefined
}

type SelectOptions = {
  skipAnimation?: boolean
  centerMap?: boolean
}
type SelectSlotProps = {
  slot?: GenericSlot
  slotId?: string
  preselected?: boolean
} & SelectOptions
type SelectedSlotContext = {
  loading: boolean
  slot?: GenericSlot
  preselected: boolean
  selectSlot: (props: SelectSlotProps) => void
  clearSelection: () => void
}

const defaultOptions = {
  skipAnimation: false,
  centerMap: true,
}
const DefaultContext = (): SelectedSlotContext => {
  const router = useRouter()
  const [slot, setSlot] = useState<GenericSlot>()
  const { zoom } = useSlots()
  const [preselected, setPreselected] = useState<boolean>(false)
  const [selectOptions, setSelectOptions] = useState<SelectOptions>(defaultOptions)
  const [fetchSlot, { loading, data }] = useSlotByIdLazyQuery()
  const { setMapCenterView, animateMapCenterView } = useMapCenter()

  const clearSelection = () => {
    setPreselected(false)
    setSlot(undefined)
  }

  // Close preselected on route change
  useEffect(() => {
    router.events.on('routeChangeStart', clearSelection)

    return () => {
      router.events.off('routeChangeStart', clearSelection)
    }
  }, [])

  useEffect(() => {
    if (data?.slot && data.slot.id !== slot?.id) {
      setSlot(data.slot)
    }
  }, [data, loading]) // because we can be loading the same slot consecutively, then `data` won't change but the `loading` will

  useEffect(() => {
    if (slot?.location) {
      const mapView: MapView = {
        lat: slot.location.latitude,
        lng: slot.location.longitude,
        zoom: Math.max(zoom, 18), // don't zoom back to 18 if the current zoom is more
      }
      if (selectOptions.centerMap) {
        if (selectOptions.skipAnimation) {
          setMapCenterView(mapView)
        } else {
          animateMapCenterView(mapView)
        }
      }
    }
  }, [slot, selectOptions])

  return {
    loading,
    slot,
    preselected,
    selectSlot: ({
      slot,
      slotId,
      preselected = false,
      skipAnimation = defaultOptions.skipAnimation,
      centerMap = defaultOptions.centerMap,
    }) => {
      setPreselected(preselected)
      setSelectOptions({ skipAnimation, centerMap })
      if (slotId) {
        fetchSlot({ variables: { id: slotId } })
      } else if (slot) {
        setSlot(slot)
      }
    },
    clearSelection,
  }
}

const SelectedSlotContext = createContext<SelectedSlotContext>(null as any)

export function SelectedSlotProvider({ children }: { children?: ReactNode }) {
  const { Provider } = SelectedSlotContext
  return <Provider value={DefaultContext()}>{children}</Provider>
}

export function useSelectedSlot() {
  return useContext(SelectedSlotContext)
}
