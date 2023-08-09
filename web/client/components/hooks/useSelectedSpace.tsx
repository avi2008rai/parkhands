import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react'

import {
  ParkingSpacesByIdsQuery,
  PickArrayType,
  useSlotsByParkingSpaceLazyQuery,
  SlotsByParkingSpaceQuery,
} from 'gql/schema'
import { Dataset } from 'gql/utils'

type Space = PickArrayType<ParkingSpacesByIdsQuery['parkingSpacesList']>
type Slot = PickArrayType<SlotsByParkingSpaceQuery['slotsList']>

type SelectedSpaceContext = {
  loading: boolean
  staticSpace?: Dataset.StaticSpace
  space?: Space
  slots?: Slot[]
  selectSpace: ({ space }: { space: Space }) => void
  selectStaticSpace: ({ staticSpace }: { staticSpace: Dataset.StaticSpace }) => void
  clearSelection: () => void
}

const DefaultContext = (): SelectedSpaceContext => {
  const [space, setSpace] = useState<Space>()
  const [staticSpace, setStaticSpace] = useState<Dataset.StaticSpace>()
  const [slots, setSlots] = useState<Slot[]>([])
  const [fetchSlots, { loading, data }] = useSlotsByParkingSpaceLazyQuery()

  useEffect(() => {
    if (data?.slotsList) {
      setSlots(data.slotsList)
    }
  }, [data, loading]) // because we can be loading the same slots consecutively, then `data` won't change but the `loading` will

  return {
    loading,
    staticSpace,
    space,
    slots,
    selectStaticSpace: ({ staticSpace }) => {
      setStaticSpace(staticSpace)
    },
    selectSpace: ({ space }) => {
      setSpace(space)
      fetchSlots({ variables: { parkingSpaceId: space.id } })
    },
    clearSelection: () => {
      setSpace(undefined)
      setSlots([])
    },
  }
}

const SelectedSpaceContext = createContext<SelectedSpaceContext>(null as any)

export function SelectedSpaceProvider({ children }: { children?: ReactNode }) {
  const { Provider } = SelectedSpaceContext
  return <Provider value={DefaultContext()}>{children}</Provider>
}

export function useSelectedSpace() {
  return useContext(SelectedSpaceContext)
}
