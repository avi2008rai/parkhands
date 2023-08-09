import _ from 'lodash'
import React, { useRef } from 'react'

import { CalendarProvider } from 'components/calendar/useCalendar'
import ArrowTimePopover from 'components/common/pickers/ArrowTimePopover'

import TimeTextField, { TimeTextFieldProps } from './TimeTextField'

type TimeFieldProps = TimeTextFieldProps & {
  minTime?: Date | null
}
export default function TimeField({ value, minTime, ...rest }: TimeFieldProps) {
  const anchorEl = useRef<HTMLInputElement>(null)
  return (
    <CalendarProvider initialDate={value instanceof Date ? value : new Date()} minTime={minTime}>
      <TimeTextField inputRef={anchorEl} value={value} {...rest} />
      <ArrowTimePopover anchorEl={anchorEl} />
    </CalendarProvider>
  )
}
