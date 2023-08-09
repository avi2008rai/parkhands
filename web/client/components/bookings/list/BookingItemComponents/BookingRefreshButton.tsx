import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Fab, useMediaQuery, Theme } from '@material-ui/core'
import { Refresh } from '@material-ui/icons'

import routes from 'common/routes'

type BookingRefreshButtonProps = {
  slotId: string
  startTime: Date
  endTime: Date
}
export default function BookingRefreshButton({
  slotId,
  startTime,
  endTime,
}: BookingRefreshButtonProps) {
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
  const { push } = useRouter()

  const clickHandler = useCallback(() => {
    const route = routes.slots.bookById({ id: slotId })
    const query = {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    }
    // https://github.com/vercel/next.js/issues/10494
    push({ pathname: route.href, query }, { pathname: route.as, query })
  }, [push, slotId, startTime, endTime])

  return (
    <Fab onClick={clickHandler} color="primary" size="small">
      <Refresh color="secondary" fontSize={mobile ? 'small' : 'default'} />
    </Fab>
  )
}
