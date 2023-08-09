import React from 'react'
import { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { OpenInBrowser } from '@material-ui/icons'
import { Zoom, Fab } from '@material-ui/core'

import theme from 'common/theme'

const transitionDuration = {
  enter: theme.transitions.duration.enteringScreen,
  exit: theme.transitions.duration.leavingScreen,
}

export default function UploadDatasetFab({ href, as }: Pick<LinkProps, 'href' | 'as'>) {
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
        title="Upload JSON Dataset"
        role="create-item"
        color="primary">
        <OpenInBrowser />
      </Fab>
    </Zoom>
  )
}
