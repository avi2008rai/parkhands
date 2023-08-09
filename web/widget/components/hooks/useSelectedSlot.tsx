import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react'

import getGraphQLClient from 'utils/getGraphQLClient'
import { SlotByIdQuery } from 'gql/schema'

type Slot = SlotByIdQuery['slot']

type SelectedSlotContext = {
  slot?: Slot
  selectSlot: ({ slotId }: { slotId: string }) => void
  clearSelection: () => void
}

const DefaultContext = (): SelectedSlotContext => {
  const [slot, setSlot] = useState<Slot>()
  const client = getGraphQLClient()

  return {
    slot,
    selectSlot: async ({ slotId }) => {
      const { data } = await client.SlotById({ id: slotId })
      if (data?.slot) {
        setSlot(data.slot)
      }
    },
    clearSelection: () => {
      setSlot(undefined)
    },
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
