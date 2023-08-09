import {
  addHours,
  addMinutes,
  isAfter,
  isBefore,
  differenceInMinutes,
  roundToNearestMinutes,
  set,
  startOfDay,
} from 'date-fns'
import { range } from 'lodash'

import round from './round'

type TimeIntervalsProps = {
  start: Date
  intervalInMinutes: number
  durationInHours: number
}

export const getDateRoundedToNextMinutes = (date: Date, minutes: number) => {
  const nearestMinutesDate = set(roundToNearestMinutes(date, { nearestTo: minutes }), {
    seconds: 0,
    milliseconds: 0,
  })
  if (isBefore(date, nearestMinutesDate)) {
    return addMinutes(nearestMinutesDate, minutes)
  }
  return nearestMinutesDate
}

export const generateTimeIntervals = ({
  start,
  intervalInMinutes,
  durationInHours,
}: TimeIntervalsProps) => {
  const nearestIntervalMinutes = roundToNearestMinutes(start, { nearestTo: intervalInMinutes })
  const rangeStart = set(
    isAfter(start, nearestIntervalMinutes)
      ? addMinutes(nearestIntervalMinutes, intervalInMinutes)
      : nearestIntervalMinutes,
    { seconds: 0, milliseconds: 0 },
  )
  const rangeEnd = addHours(rangeStart, durationInHours)
  return range(rangeStart.getTime(), rangeEnd.getTime(), intervalInMinutes * 60 * 1000) // 5 minute intervals
}

export const generateTodayTimeIntervals = () => {
  const today = startOfDay(new Date())
  return generateTimeIntervals({
    start: today,
    intervalInMinutes: 5,
    durationInHours: 24,
  })
}

export const differenceInHours = (startTime: Date, endTime: Date) => {
  return round(differenceInMinutes(startTime, endTime) / 60, 2)
}
