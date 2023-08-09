import _ from 'lodash'
import { useFormContext } from 'react-hook-form'
import { roundToNearestMinutes, addHours } from 'date-fns'
import React, { useState, createContext, useContext, ReactNode, useEffect, useMemo } from 'react'

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6
type DateType = Date | null
type AvailabilityContext = {
  current: [Date, Date]
  everyDay: boolean
  masterStart: DateType
  masterEnd: DateType
  setEveryDayEnabled: (everyDay: boolean) => void
  setEnabled: (dayOfWeek: DayOfWeek, enabled: boolean) => void
  setMasterStart: (date: Date | null) => void
  setMasterEnd: (date: Date | null) => void
}

export function getInitialHours() {
  const currentTime = roundToNearestMinutes(new Date(), { nearestTo: 30 })
  return [currentTime, addHours(currentTime, 2)]
}

const DefaultContext = (): AvailabilityContext => {
  const { setValue, watch } = useFormContext()
  const [currentStartHour, currentEndHour] = getInitialHours()

  // Derive disabled state from the presence of startHour and endHour
  const [startHour, setStartHour] = useState<Date | null>(currentStartHour)
  const [endHour, setEndHour] = useState<Date | null>(currentEndHour)
  const [everyDay, setEveryDay] = useState(false)

  const availability = watch('availability')

  useEffect(() => {
    // Check number of unique start and end hours - when == 1 then all inputs are the same
    const hasCustomStartSchedule = _.uniqBy(availability, 'startHour').length > 1
    const hasCustomEndSchedule = _.uniqBy(availability, 'endHour').length > 1
    const allAreEnabled = !_.some(availability, { enabled: false })
    setEveryDay(!hasCustomStartSchedule && !hasCustomEndSchedule && allAreEnabled)
  }, [availability])

  const setMasterStart = (date: Date | null) => {
    setStartHour(date)
    if (everyDay && date) {
      _.map(_.range(7), (dayOfWeek: DayOfWeek) => {
        setValue(`availability[${dayOfWeek}].startHour`, date)
      })
    }
  }

  const setMasterEnd = (date: Date | null) => {
    setEndHour(date)
    if (everyDay && date) {
      _.map(_.range(7), (dayOfWeek: DayOfWeek) => {
        setValue(`availability[${dayOfWeek}].endHour`, date)
      })
    }
  }

  const setEnabled = (dayOfWeek: DayOfWeek, enabled: boolean) => {
    setValue(`availability[${dayOfWeek}].enabled`, enabled)
    if (everyDay) {
      setEveryDay(false)
    }
  }

  const setEveryDayEnabled = (enabled: boolean) => {
    setEveryDay(enabled)
    _.map(_.range(7), (dayOfWeek: DayOfWeek) => {
      setValue(`availability[${dayOfWeek}].enabled`, enabled)
      if (enabled) {
        setValue(`availability[${dayOfWeek}].startHour`, startHour)
        setValue(`availability[${dayOfWeek}].endHour`, endHour)
      }
    })
  }

  return {
    current: [currentStartHour, currentEndHour],
    everyDay,
    masterStart: startHour,
    masterEnd: endHour,
    setEveryDayEnabled: (everyDay: boolean) => setEveryDayEnabled(everyDay),
    setEnabled: (dayOfWeek: DayOfWeek, enabled: boolean) => setEnabled(dayOfWeek, enabled),
    setMasterStart: (date: Date | null) => setMasterStart(date),
    setMasterEnd: (date: Date | null) => setMasterEnd(date),
  }
}

const AvailabilityContext = createContext<AvailabilityContext>(null as any)

export function AvailabilityProvider({ children }: { children?: ReactNode }) {
  const { Provider } = AvailabilityContext
  return <Provider value={DefaultContext()}>{children}</Provider>
}

export function useAvailability() {
  return useContext(AvailabilityContext)
}
