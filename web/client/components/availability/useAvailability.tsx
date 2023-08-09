import _ from 'lodash'
import { set } from 'date-fns'
import { useFormContext } from 'react-hook-form'
import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react'

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6
type DateType = Date | null
type AvailabilityContext = {
  current: [Date, Date]
  everyDay: boolean
  masterStart: DateType
  masterEnd: DateType
  setEveryDayEnabled: (everyDay: boolean) => void
  setEnabled: (dayOfWeek: DayOfWeek, enabled: boolean) => void
  setStart: (dayOfWeek: DayOfWeek, date: DateType) => void
  setEnd: (dayOfWeek: DayOfWeek, date: DateType) => void
  setMasterStart: (date: Date | null) => void
  setMasterEnd: (date: Date | null) => void
}

export function getInitialHours() {
  const today = new Date()
  return [set(today, { hours: 9, minutes: 0 }), set(today, { hours: 18, minutes: 0 })]
}

const DefaultContext = (): AvailabilityContext => {
  const { setValue, watch } = useFormContext()
  const [currentStartHour, currentEndHour] = getInitialHours()

  // Derive disabled state from the presence of startHour and endHour
  const [startHour, setStartHour] = useState<DateType>(currentStartHour)
  const [endHour, setEndHour] = useState<DateType>(currentEndHour)
  const [everyDay, setEveryDay] = useState(false)

  const availability = watch('availability')

  useEffect(() => {
    // Check number of unique start and end hours - when == 1 then all inputs are the same
    const hasCustomStartSchedule = _.uniqBy(availability, 'startHour').length > 1
    const hasCustomEndSchedule = _.uniqBy(availability, 'endHour').length > 1
    const allAreEnabled = !_.some(availability, { enabled: false })
    setEveryDay(!hasCustomStartSchedule && !hasCustomEndSchedule && allAreEnabled)
  }, [availability])

  const setEnabled = (dayOfWeek: DayOfWeek, enabled: boolean) => {
    setValue(`availability[${dayOfWeek}].enabled`, enabled)
    if (everyDay) {
      // Turn off everyday auto once one of the days is off
      setEveryDay(false)
    }
  }
  const setStart = (dayOfWeek: DayOfWeek, startHour: DateType) => {
    setValue(`availability[${dayOfWeek}].startHour`, startHour)
  }
  const setEnd = (dayOfWeek: DayOfWeek, endHour: DateType) => {
    setValue(`availability[${dayOfWeek}].endHour`, endHour)
  }

  const setMasterStart = (date: DateType) => {
    setStartHour(date)
    if (everyDay && date) {
      _.map(_.range(7), (dayOfWeek: DayOfWeek) => setStart(dayOfWeek, date))
    }
  }

  const setMasterEnd = (date: DateType) => {
    setEndHour(date)
    if (everyDay && date) {
      _.map(_.range(7), (dayOfWeek: DayOfWeek) => setEnd(dayOfWeek, date))
    }
  }

  const setEveryDayEnabled = (enabled: boolean) => {
    setEveryDay(enabled)
    _.map(_.range(7), (dayOfWeek: DayOfWeek) => {
      setEnabled(dayOfWeek, enabled)
      if (enabled) {
        // Update all records based on the master
        setStart(dayOfWeek, startHour)
        setEnd(dayOfWeek, endHour)
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
    setStart: (dayOfWeek: DayOfWeek, date: DateType) => setStart(dayOfWeek, date),
    setEnd: (dayOfWeek: DayOfWeek, date: DateType) => setEnd(dayOfWeek, date),
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
