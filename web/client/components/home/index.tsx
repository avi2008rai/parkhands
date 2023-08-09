import React, { useEffect, useState } from 'react'
import { Paper, Box, useMediaQuery, Theme } from '@material-ui/core'

import LoadSlots from 'components/slots/LoadSlots'
import ErrorPage from 'components/error/ErrorPage'
import { useSelectedSlot } from 'components/hooks/useSelectedSlot'
import { useSidekick } from 'components/hooks/useSidekick'
import { useSearchResult } from 'components/hooks/useSearchResult'
import { useDecksHelper } from 'components/slots/list/useDecksHelper'
import SelectedSlotDetails from 'components/slots/selected-slot/SelectedSlotDetails'
import PreselectedSlotCard from 'components/slots/selected-slot/PreselectedSlotCard'
import { useQueryLocation } from 'components/hooks/useQueryLocation'
import SelectedSlotDialog from 'components/slots/selected-slot/SelectedSlotDialog'

export default function HomePage() {
  const { error } = useQueryLocation()
  const { open, close } = useSidekick()
  const { flagLocation } = useSearchResult()
  const { slot: selectedSlot, preselected } = useSelectedSlot()
  const { showSpaceColumnListing } = useDecksHelper()
  const [errorPage, setErrorPage] = useState(false)
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'))

  useEffect(() => {
    if (error) {
      setErrorPage(true)
    }
  }, [error])

  useEffect(() => {
    if (xs) {
      // close()
      return
    }
    if (selectedSlot && !preselected) {
      if (flagLocation) {
        open({ secondary: <SelectedSlotDetails /> })
      } else {
        open({ primary: <SelectedSlotDetails />, secondary: null })
      }
    } else {
      if (flagLocation) {
        close('secondary')
      } else {
        close()
      }
    }
  }, [selectedSlot, preselected, flagLocation, xs])

  // Open/close the slots list in the primary deck when there is a search.
  // The reason for this being in the component of the page is
  // that this is the place that loads the slots via `LoadSlots`.
  // The slots shown in the `SlotsList` are the ones from `LoadSlots`.
  useEffect(() => {
    // Do not open side deck on mobile view, only on desktop
    if (flagLocation && !xs) {
      showSpaceColumnListing()
    } else {
      close('primary')
    }
  }, [flagLocation])

  if (errorPage) {
    return (
      <Paper>
        <Box py={1} px={10}>
          <ErrorPage statusCode={400} title="invalid_location" />
        </Box>
      </Paper>
    )
  }
  return (
    <>
      <LoadSlots />
      <PreselectedSlotCard />
      {xs && <SelectedSlotDialog />}
    </>
  )
}
