import React, { useEffect } from 'react'
import { useSelectedSlot, isSlot } from 'components/hooks/useSelectedSlot'

import SlotDetails from './SlotDetails'
import StaticSlotDetails from './StaticSlotDetails'

export default function SelectedSlotDetails() {
  const { slot, loading, clearSelection } = useSelectedSlot()

  useEffect(() => {
    return () => clearSelection()
  }, [])

  if (!slot || loading) {
    return null
  }

  if (isSlot(slot)) {
    return <SlotDetails showCta slot={slot} />
  }
  return <StaticSlotDetails showCta slot={slot} />
}
