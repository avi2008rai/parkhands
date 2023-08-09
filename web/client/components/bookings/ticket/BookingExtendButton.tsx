import { addHours } from 'date-fns'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import React, { useCallback, useState } from 'react'
import { Typography, Button } from '@material-ui/core'

import routes from 'common/routes'
import { Domain } from 'common/i18n/locale'
import { useBooking } from 'components/hooks/useBooking'
import CalendarDialog from 'components/calendar/CalendarDialog'

export default function BookingExtendButton() {
  const { t } = useTranslation(Domain.Pages)
  const { push } = useRouter()
  const { booking, ongoing, canceled } = useBooking()
  const [calendarOpen, setCalendarOpen] = useState(false)
  const openCalendar = useCallback(() => {
    setCalendarOpen(true)
  }, [setCalendarOpen])
  const closeCalendar = useCallback(() => {
    setCalendarOpen(false)
  }, [setCalendarOpen])
  const selectDates = useCallback(
    (startTime: Date, endTime: Date) => {
      if (!booking || !booking.slot) {
        return
      }
      const route = routes.slots.bookById({ id: booking.slot.id })
      const query = {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      }
      // https://github.com/vercel/next.js/issues/10494
      push({ pathname: route.href, query }, { pathname: route.as, query })
    },
    [push, booking],
  )

  if (!booking || !ongoing || canceled) {
    return null
  }

  return (
    <>
      <Button size="small" onClick={openCalendar}>
        <Typography variant="caption" align="center" color="secondary">
          {t('extend_time')}
        </Typography>
      </Button>
      <CalendarDialog
        open={calendarOpen}
        slotId={booking.slot?.id!}
        startTime={new Date(booking.endTime!)}
        endTime={addHours(new Date(booking.endTime!), 1)}
        onClose={closeCalendar}
        onSelectedRange={selectDates}
      />
    </>
  )
}
