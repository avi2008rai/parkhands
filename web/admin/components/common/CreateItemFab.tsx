import React from 'react'
import { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { Add } from '@material-ui/icons'
import { Zoom, Fab } from '@material-ui/core'

import theme from 'common/theme'

const transitionDuration = {
  enter: theme.transitions.duration.enteringScreen,
  exit: theme.transitions.duration.leavingScreen,
}

export default function CreateItemFab({ href, as }: Pick<LinkProps, 'href' | 'as'>) {
  const router = useRouter()
  return (
    <Zoom
      in
      unmountOnExit
      timeout={transitionDuration}
      style={{
        transitionDelay: `${transitionDuration.exit}ms`,
      }}>
      <Fab
        onClick={() => router.push(href, as)}
        aria-label="Add"
        role="create-item"
        color="primary">
        <Add />
      </Fab>
    </Zoom>
  )
}
