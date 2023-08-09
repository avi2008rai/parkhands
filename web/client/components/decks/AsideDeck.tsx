import React from 'react'

import { SideDrawer } from 'components/decks/SideDrawer'
import { useSidekick } from 'components/hooks/useSidekick'

export default function AsideDeck() {
  const { primary, primaryProps, secondary, secondaryProps } = useSidekick()

  return (
    <aside>
      <SideDrawer deck="primary" {...primaryProps}>
        {primary}
      </SideDrawer>
      <SideDrawer deck="secondary" {...secondaryProps}>
        {secondary}
      </SideDrawer>
    </aside>
  )
}
