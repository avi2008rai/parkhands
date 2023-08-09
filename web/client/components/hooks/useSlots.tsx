import React, { useState, createContext, useContext, ReactNode } from 'react'
import { SlotCluster, ClusterPoint, StaticSlotPoint, SlotPoint } from 'pages/api/slots/find'

type SlotsContext = {
  zoom: number
  setZoom: (zoom: number) => void
  slots: SlotCluster[]
  setSlots: (slots: SlotCluster[]) => void
}

export function isCluster(point: SlotCluster): point is ClusterPoint {
  return (point as ClusterPoint).properties.cluster !== undefined
}
export function isSlot(point: SlotCluster): point is SlotPoint {
  return (point as SlotPoint).properties.parkingSpaceId !== undefined
}
export function isStaticSlot(point: SlotCluster): point is StaticSlotPoint {
  return (point as StaticSlotPoint).properties.static !== undefined
}

const DefaultContext = (): SlotsContext => {
  const [slots, setSlots] = useState<SlotCluster[]>([])
  const [zoom, setZoom] = useState(15)

  return {
    zoom,
    setZoom: (zoom: number) => setZoom(zoom),
    slots,
    setSlots: (slots) => setSlots(slots),
  }
}

const SlotsContext = createContext<SlotsContext>(null as any)

export function SlotsProvider({ children }: { children?: ReactNode }) {
  const { Provider } = SlotsContext
  return <Provider value={DefaultContext()}>{children}</Provider>
}

export function useSlots() {
  return useContext(SlotsContext)
}
