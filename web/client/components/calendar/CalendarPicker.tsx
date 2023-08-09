import _ from 'lodash'
import { Box } from '@material-ui/core'
import React, { useCallback } from 'react'
import DateFnsUtils from '@date-io/date-fns' // choose your lib
import { isAfter, isBefore, isSameDay } from 'date-fns'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import { usePeriod } from 'components/calendar/usePeriod'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      textAlign: 'center',
      margin: theme.spacing(2, 0),
      boxShadow: '8px 0px 14px 4px #151E2680',
      borderRadius: theme.shape.borderRadius * 2,
      '& > .MuiPickersStaticWrapper-staticWrapperRoot': {
        borderRadius: theme.shape.borderRadius * 2,
      },
      '& .MuiPickersBasePicker-pickerView': {
        maxWidth: 'inherit', // Override MuiPickers styles
      },
    },
    borderDate: {
      '& .MuiPickersDay-day': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
      },
    },
    rangeDate: {
      '& .MuiPickersDay-day': {
        color: theme.palette.secondary.main,
        '&:hover': {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.secondary.main,
        },
      },
    },
  }),
)

type CalendarPickerProps = {}
export default function CalendarPicker({}: CalendarPickerProps) {
  const classes = useStyles()
  const {
    startDate,
    endDate,
    set: { setStartDate, setEndDate, setRange },
  } = usePeriod()

  const isSingleDay = useCallback((day: Date) => isSameDay(startDate, endDate), [
    startDate,
    endDate,
  ])
  const isStartDay = useCallback((day: Date) => isSameDay(day, startDate), [startDate])
  const isEndDay = useCallback((day: Date) => isSameDay(day, endDate), [endDate])
  const isRange = useCallback((day: Date) => isAfter(day, startDate) && isBefore(day, endDate), [
    startDate,
    endDate,
  ])

  const applyDateRange = useCallback(
    (selected) => {
      if (!selected) {
        return
      }

      if (isStartDay(selected) || isEndDay(selected) || isRange(selected)) {
        if (isSingleDay(selected)) {
          // We don't want to set the range again if it's the same day
          return
        }
        // Select single day if user clicks between the start and the end
        // Normally users may want to book for an hour, not for a week
        setRange(selected, selected)
        return
      }

      if (isBefore(selected, startDate)) {
        // Adjust start
        setStartDate(selected)
      } else if (isAfter(selected, endDate)) {
        // Adjust end
        setEndDate(selected)
      }
    },
    [isStartDay, isEndDay, isRange, startDate, endDate],
  )

  const renderDay = useCallback(
    (day, selectedDate, isDayInCurrentMonth, DayComponent) => {
      if (day && (isStartDay(day) || isEndDay(day))) {
        return <div className={classes.borderDate}>{DayComponent}</div>
      }
      if (day && isRange(day)) {
        return <div className={classes.rangeDate}>{DayComponent}</div>
      }
      return DayComponent
    },
    [isStartDay, isEndDay, isRange],
  )

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box textAlign="center" className={classes.root}>
        <DatePicker
          disablePast
          disableToolbar
          openTo="date"
          variant="static"
          orientation="portrait"
          value={endDate}
          renderDay={renderDay}
          onChange={applyDateRange}
        />
      </Box>
    </MuiPickersUtilsProvider>
  )
}
