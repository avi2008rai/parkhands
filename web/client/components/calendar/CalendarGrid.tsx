import { map, range, groupBy, findIndex } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Grid, Typography, Tabs, Tab } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import {
  addDays,
  addHours,
  addMinutes,
  format,
  getMinutes,
  isAfter,
  isBefore,
  isSameMinute,
  parse,
  startOfDay,
  startOfHour,
  isSameDay,
  isEqual,
} from 'date-fns'

import { colors } from 'common/theme'
import { Domain } from 'common/i18n/locale'
import useFormError from 'components/hooks/useFormError'
import { SlotTimetableResult, useSlotTimetableLazyQuery } from 'gql/schema'

const today = new Date()
const BOOKABLE_DAYS_IN_THE_FUTURE = 10
const selectableDays = map(range(0, BOOKABLE_DAYS_IN_THE_FUTURE + 1), (daysToAdd) => {
  return startOfDay(addDays(today, daysToAdd))
})

const isTimeslotAvailable = (timeslot: SlotTimetableResult, now: Date) => {
  return timeslot.booked || isBefore(new Date(timeslot.endTime), now)
}

const isPeriodAvailable = (timetable: SlotTimetableResult[], start: Date, end: Date) => {
  const startIndex = findIndex(timetable, (timeslot) =>
    isEqual(new Date(timeslot.startTime), start),
  )
  const slicedTimetable = timetable.slice(startIndex)
  if (slicedTimetable.length === 0) {
    return false
  }

  for (const timeslot of slicedTimetable) {
    if (timeslot.booked) {
      return false
    }
    if (isAfter(new Date(timeslot.endTime), end) || isEqual(new Date(timeslot.endTime), end)) {
      return true
    }
  }
  return false
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      overflow: 'auto',
    },
    grid: {
      padding: theme.spacing(2, 2, 2, 0),
    },
    gridRow: {
      '&:hover': {
        backgroundColor: '#22303B',
      },
    },
    controlBox: {
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    dateField: {
      color: theme.palette.secondary.main,
    },
    timeField: {
      color: theme.palette.secondary.main,
      textAlign: 'right',
      [theme.breakpoints.only('xs')]: {
        textAlign: 'center',
      },
    },
    hour: {
      cursor: 'pointer',
      userSelect: 'none',
      fontSize: theme.typography.pxToRem(10),
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    headerTable: {
      userSelect: 'none',
      textAlign: 'center',
      '& > .MuiGrid-item > div': {
        [theme.breakpoints.only('xs')]: {
          width: 'auto',
        },
        height: theme.spacing(2),
        margin: theme.spacing(0.25),
        cursor: 'default',
      },
    },
    cellTable: {
      textAlign: 'center',
      '& > .MuiGrid-item > div': {
        [theme.breakpoints.only('xs')]: {
          width: 'auto',
        },
        height: theme.spacing(2),
        margin: theme.spacing(0.25),
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.palette.secondary.main,
        },
      },
    },
    cell: {
      backgroundColor: colors.light,
    },
    selectedCell: {
      backgroundColor: theme.palette.secondary.main,
    },
    rangeCell: {
      opacity: 0.5,
      backgroundColor: theme.palette.secondary.main,
    },
    invalidSelectionRangeCell: {
      opacity: 0.3,
      backgroundColor: theme.palette.error.light,
    },
    invalidSelectionCell: {
      opacity: 0.6,
      backgroundColor: theme.palette.error.light,
    },
    bookedCell: {
      backgroundColor: '#243441',
    },
    emptyCell: {
      backgroundColor: '#243441',
    },
    selectedDay: {
      '&&': {
        // raise specificity so the selected styles override the normal color styles
        color: theme.palette.secondary.main,
      },
    },
    inactiveDay: {
      color: colors.light,
    },
    selectedDayIndicator: {
      display: 'none', // Hide the indicator. Different colors are used to indicate which is the selected tab.
    },
    selectableDay: {
      textTransform: 'none',
    },
  }),
)

type Grid = {
  [key: string]: SlotTimetableResult[]
}

type AvailabilityGridParams = {
  slotId: string
  selectedStart: Date
  selectedEnd: Date
  onChangeStart: (date: Date) => void
  onChangeEnd: (date: Date) => void
  onInvalidSelection: (invalid: boolean) => void
}
export default function CalendarGrid({
  slotId,
  selectedStart,
  selectedEnd,
  onChangeStart,
  onChangeEnd,
  onInvalidSelection,
}: AvailabilityGridParams) {
  const now = useMemo(() => {
    return new Date()
  }, [])
  const { t } = useTranslation(Domain.General)
  const { FormError, setError, resetError } = useFormError()
  const classes = useStyles()
  // Grid drawing range
  const [gridStart, setGridStart] = useState(startOfDay(selectedStart))
  const [gridEnd, setGridEnd] = useState(startOfDay(addDays(selectedStart, 1)))

  const [fetchTimetable, { data }] = useSlotTimetableLazyQuery({
    variables: {
      slotId,
      startTime: gridStart,
      endTime: gridEnd,
    },
  })

  const invalidSelection = useMemo(() => {
    if (
      data?.slotTimetableList &&
      isSameDay(selectedStart, new Date(data?.slotTimetableList[0].endTime)) // check only when in the same day, the timetable contains only one day, so checks across day will be wrong. Rely on the backend validation for this check when creating the booking.
    ) {
      return !isPeriodAvailable(data.slotTimetableList, selectedStart, selectedEnd)
    }
    return false
  }, [selectedStart, selectedEnd, data])

  useEffect(() => {
    onInvalidSelection(invalidSelection)
    if (invalidSelection) {
      setError('error_selection_invalid', 'error')
    } else {
      resetError()
    }
  }, [invalidSelection])

  const grid = useMemo((): Grid => {
    return groupBy(data?.slotTimetableList, (timeslot) => {
      return format(new Date(timeslot.startTime), 'HH:00')
    })
  }, [data])

  useEffect(() => {
    // Initially load timetable
    fetchTimetable()
  }, [])

  // Date selection per full hour
  const onSelectHour = useMemo(
    () => (hour: string) => () => {
      onChangeStart(startOfHour(parse(hour, 'HH:00', gridStart)))
      onChangeEnd(addHours(startOfHour(parse(hour, 'HH:00', gridStart)), 1))
    },
    [gridStart, onChangeStart, onChangeEnd],
  )

  const onSelectTime = useMemo(
    () => (timeslot: SlotTimetableResult) => () => {
      if (isTimeslotAvailable(timeslot, now)) {
        // Date is unavailable
        return
      }
      const cellTime = new Date(timeslot.startTime)
      // Pick start
      if (isBefore(cellTime, selectedStart) || isBefore(cellTime, selectedEnd)) {
        onChangeStart(cellTime)
      }
      // Pick end
      if (isAfter(cellTime, selectedStart) || isAfter(cellTime, selectedEnd)) {
        onChangeEnd(addMinutes(cellTime, 5))
      }
    },
    [selectedStart, onChangeStart, selectedEnd, onChangeEnd],
  )

  const getCellClass = useCallback(
    (timeslot: SlotTimetableResult) => {
      if (isTimeslotAvailable(timeslot, now)) {
        return classes.bookedCell
      }

      // Light cells
      if (
        isSameMinute(new Date(timeslot.startTime), selectedStart) ||
        isSameMinute(new Date(timeslot.endTime), selectedEnd)
      ) {
        return invalidSelection ? classes.invalidSelectionCell : classes.selectedCell
      }

      // Range cells
      if (
        isAfter(new Date(timeslot.startTime), selectedStart) &&
        isBefore(new Date(timeslot.endTime), selectedEnd)
      ) {
        return invalidSelection ? classes.invalidSelectionRangeCell : classes.rangeCell
      }

      // Default available cells
      return classes.cell
    },
    [selectedStart, selectedEnd, invalidSelection],
  )

  const changeTab = useCallback(
    (event: React.ChangeEvent<unknown>, date: string) => {
      const day = new Date(date)
      setGridStart(startOfDay(day))
      setGridEnd(startOfDay(addDays(day, 1)))
    },
    [setGridStart, setGridEnd],
  )

  return (
    <Box className={classes.root}>
      <Grid container justify="center" spacing={0} direction="column" className={classes.grid}>
        <Grid item container className={classes.controlBox}>
          <Grid item xs={12}>
            <Tabs
              variant="scrollable"
              onChange={changeTab}
              value={startOfDay(gridStart).toString()}
              classes={{ indicator: classes.selectedDayIndicator }}>
              {map(selectableDays, (date, index) => {
                return (
                  <Tab
                    key={index}
                    label={isSameDay(date, today) ? t('Today') : format(date, 'LLL d')}
                    value={startOfDay(date).toString()}
                    classes={{
                      textColorInherit: classes.inactiveDay,
                      selected: classes.selectedDay,
                      root: classes.selectableDay,
                    }}
                  />
                )
              })}
            </Tabs>
          </Grid>
        </Grid>
        <Grid
          item
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="space-between"
          className={classes.gridRow}>
          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              className={classes.headerTable}>
              {map(range(0, 12), (minutes) => (
                <Grid item xs={1} key={minutes} className={classes.hour}>
                  <div>{minutes * 5}</div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        {map(grid, (timeslots, hours) => {
          const before = getMinutes(new Date(timeslots[0].startTime)) > 0
          const after = getMinutes(new Date(timeslots[timeslots.length - 1].startTime)) < 55
          return (
            <Grid
              item
              container
              spacing={0}
              key={hours}
              direction="row"
              alignItems="center"
              justify="space-between"
              className={classes.gridRow}>
              <Grid item xs={2}>
                <Typography
                  variant="h4"
                  align="center"
                  className={classes.hour}
                  onClick={onSelectHour(hours)}>
                  {hours}
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify="center"
                  className={classes.cellTable}>
                  {before &&
                    map(range(0, 12 - timeslots.length), (index) => (
                      <Grid item xs={1} key={index}>
                        <div className={classes.emptyCell} />
                      </Grid>
                    ))}
                  {map(timeslots, (timeslot, minutes) => (
                    <Grid item xs={1} key={minutes}>
                      <div className={getCellClass(timeslot)} onClick={onSelectTime(timeslot)} />
                    </Grid>
                  ))}
                  {after &&
                    map(range(0, 12 - timeslots.length), (index) => (
                      <Grid item xs={1} key={index}>
                        <div className={classes.emptyCell} />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
      <Box p={2}>
        <FormError />
      </Box>
    </Box>
  )
}
