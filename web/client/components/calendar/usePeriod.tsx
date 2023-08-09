import { addMinutes, addHours, isBefore, isEqual, isSameHour, differenceInMinutes } from 'date-fns'
import React, { useState, createContext, useContext, useMemo, useCallback, useEffect } from 'react'

const MIN_SELECTION_IN_MINUTES = 15

type CalendarContext = {
  startDate: Date
  endDate: Date
  popover: {
    open: boolean
    openCalendar: () => void
    closeCalendar: () => void
    closeResetCalendar: () => void
    toggle: () => void
  }
  can: {
    canAdjustStartHour: (value: number) => boolean
    canAdjustStartMinute: (value: number) => boolean
    canAdjustEndHour: (value: number) => boolean
    canAdjustEndMinute: (value: number) => boolean
  }
  set: {
    adjustStartHour: (value: number) => void
    adjustStartMinute: (value: number) => void
    adjustEndHour: (value: number) => void
    adjustEndMinute: (value: number) => void
    setStartDate: (newDate: Date) => void
    setEndDate: (newDate: Date) => void
    resetPeriod: () => void
    setRange: (start: Date, end: Date) => void
  }
}
type ContextProps = {
  initialStart: Date
  initialEnd: Date
  minTime?: Date | null
}
const DefaultContext = ({ initialStart, initialEnd, minTime }: ContextProps): CalendarContext => {
  const [open, setOpen] = useState(false)
  const [startDate, setStartDateInternal] = useState(initialStart)
  const [endDate, setEndDateInternal] = useState(initialEnd)

  const resetPeriod = useCallback(() => {
    // Reset dates on close of calendar
    setStartDateInternal(initialStart)
    setEndDateInternal(initialEnd)
  }, [initialStart, initialEnd])

  const setRange = useCallback((start: Date, end: Date) => {
    setStartDateInternal(start)
    setEndDateInternal(end)
  }, [])

  const popover = useMemo(
    () => ({
      open,
      openCalendar: () => setOpen(true),
      closeCalendar: () => setOpen(false),
      closeResetCalendar: () => {
        setOpen(false)
        resetPeriod()
      },
      toggle: () => setOpen(!open),
    }),
    [open, resetPeriod],
  )

  useEffect(() => {
    // Make sure there is always MIN_SELECTION_IN_MINUTES distance
    if (differenceInMinutes(endDate, startDate) < MIN_SELECTION_IN_MINUTES) {
      setEndDateInternal(addMinutes(startDate, MIN_SELECTION_IN_MINUTES))
    }
  }, [startDate, endDate])

  // Check if user is allowed to adjust time
  const canAdjustStartHour = useCallback(
    (hour: number) => (minTime ? isBefore(minTime, addHours(startDate, hour)) : true),
    [startDate, minTime],
  )
  const canAdjustStartMinute = useCallback(
    (minute: number) => (minTime ? isBefore(minTime, addMinutes(startDate, minute)) : true),
    [startDate, minTime],
  )
  const canAdjustEndHour = useCallback(
    (hour: number) =>
      startDate
        ? differenceInMinutes(addHours(endDate, hour), startDate) >= MIN_SELECTION_IN_MINUTES
        : true,
    [endDate, startDate],
  )
  const canAdjustEndMinute = useCallback(
    (minute: number) =>
      startDate
        ? differenceInMinutes(addMinutes(endDate, minute), startDate) >= MIN_SELECTION_IN_MINUTES
        : true,
    [endDate, startDate],
  )

  // Time adjustments
  const adjustStartHour = useCallback(
    (hour: number) => setStartDateInternal(addHours(startDate, hour)),
    [startDate],
  )
  const adjustStartMinute = useCallback(
    (minute: number) => setStartDateInternal(addMinutes(startDate, minute)),
    [startDate],
  )
  const adjustEndHour = useCallback((hour: number) => setEndDateInternal(addHours(endDate, hour)), [
    endDate,
  ])
  const adjustEndMinute = useCallback(
    (minute: number) => setEndDateInternal(addMinutes(endDate, minute)),
    [endDate],
  )

  // Adjust general dates
  const setStartDate = useCallback(
    (newDate: Date) => !isEqual(startDate, newDate) && setStartDateInternal(newDate),
    [startDate],
  )
  const setEndDate = useCallback(
    (newDate: Date) => !isEqual(endDate, newDate) && setEndDateInternal(newDate),
    [endDate],
  )

  return {
    startDate,
    endDate,
    popover,
    can: {
      canAdjustStartHour,
      canAdjustStartMinute,
      canAdjustEndHour,
      canAdjustEndMinute,
    },
    set: {
      adjustStartHour,
      adjustStartMinute,
      adjustEndHour,
      adjustEndMinute,
      setStartDate,
      setEndDate,
      resetPeriod,
      setRange,
    },
  }
}

const CalendarContext = createContext<CalendarContext>(null as any)

type PeriodProviderProps = React.PropsWithChildren<ContextProps>
export function PeriodProvider({
  initialStart,
  initialEnd,
  minTime,
  children,
}: PeriodProviderProps) {
  const { Provider } = CalendarContext
  return (
    <Provider value={DefaultContext({ initialStart, initialEnd, minTime })}>{children}</Provider>
  )
}

export function usePeriod() {
  return useContext(CalendarContext)
}
