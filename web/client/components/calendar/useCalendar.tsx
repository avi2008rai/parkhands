import { addMinutes, addHours, isBefore, isEqual } from 'date-fns'
import React, { useState, createContext, useContext, useMemo, useCallback } from 'react'

type CalendarContext = {
  date: Date
  popover: {
    open: boolean
    openCalendar: () => void
    closeCalendar: () => void
    toggle: () => void
  }
  can: {
    canAdjustHour: (hour: number) => boolean
    canAdjustMinute: (minute: number) => boolean
  }
  set: {
    adjustHour: (hour: number) => void
    adjustMinute: (minute: number) => void
    setDate: (newDate: Date) => void
  }
}
type ContextProps = {
  initialDate: Date
  minTime?: Date | null
}
const DefaultContext = ({ initialDate, minTime }: ContextProps): CalendarContext => {
  const [open, setOpen] = useState(false)
  const [date, setDateInternal] = useState(initialDate)

  const popover = useMemo(
    () => ({
      open,
      openCalendar: () => setOpen(true),
      closeCalendar: () => setOpen(false),
      toggle: () => setOpen(!open),
    }),
    [open],
  )

  const canAdjustHour = useCallback(
    (hour: number) => {
      if (!minTime) {
        return true
      }
      return isBefore(minTime, addHours(date, hour))
    },
    [date, minTime],
  )
  const canAdjustMinute = useCallback(
    (minute: number) => {
      if (!minTime) {
        return true
      }
      return isBefore(minTime, addMinutes(date, minute))
    },
    [date, minTime],
  )

  const adjustHour = useCallback((hour: number) => setDateInternal(addHours(date, hour)), [date])
  const adjustMinute = useCallback((minute: number) => setDateInternal(addMinutes(date, minute)), [
    date,
  ])
  const setDate = useCallback(
    (newDate: Date) => !isEqual(date, newDate) && setDateInternal(newDate),
    [date],
  )

  return {
    date,
    popover,
    can: { canAdjustHour, canAdjustMinute },
    set: {
      adjustHour,
      adjustMinute,
      setDate,
    },
  }
}

const CalendarContext = createContext<CalendarContext>(null as any)

type CalendarProviderProps = React.PropsWithChildren<ContextProps>
export function CalendarProvider({ initialDate, minTime, children }: CalendarProviderProps) {
  const { Provider } = CalendarContext
  return <Provider value={DefaultContext({ initialDate, minTime })}>{children}</Provider>
}

export function useCalendar() {
  return useContext(CalendarContext)
}
