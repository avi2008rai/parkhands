import React, { useCallback } from 'react'
import { useMediaQuery, Theme } from '@material-ui/core'

import { useSearchResult } from 'components/hooks/useSearchResult'
import { useSidekick } from 'components/hooks/useSidekick'

import SlotColumnListing from './SlotColumnListing'
import SpaceColumnListing from './SpaceColumnListing'
import StaticSlotColumnListing from './StaticSlotColumnListing'

export function useDecksHelper() {
  const { open } = useSidekick()
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'))
  const { clearResult } = useSearchResult()

  const showSpaceColumnListing = useCallback(() => {
    open({
      primary: <SpaceColumnListing />,
      primaryProps: {
        onClose: () => {
          clearResult()
        },
        ...(mobile ? { hideTopCloseBar: true, fullWidth: false } : {}),
      },
    })
  }, [open, mobile, clearResult])

  const showSlotColumnListing = useCallback(() => {
    open({
      primary: <SlotColumnListing />,
      primaryProps: {
        onClose: () => {
          showSpaceColumnListing()
        },
        ...(mobile ? { hideTopCloseBar: true, fullWidth: false } : {}),
      },
    })
  }, [open, mobile, clearResult, showSpaceColumnListing])

  const showStaticSlotColumnListing = useCallback(() => {
    open({
      primary: <StaticSlotColumnListing />,
      primaryProps: {
        onClose: () => {
          showSpaceColumnListing()
        },
        ...(mobile ? { hideTopCloseBar: true, fullWidth: false } : {}),
      },
    })
  }, [open, mobile, clearResult, showSpaceColumnListing])

  return { showSpaceColumnListing, showSlotColumnListing, showStaticSlotColumnListing }
}
