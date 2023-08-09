import _ from 'lodash'
import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { usePeriod } from 'components/calendar/usePeriod'
import CloseModalButton from 'components/common/CloseModalButton'
import ArrowTimePicker from 'components/common/pickers/ArrowTimePicker'

import CalendarPicker from './CalendarPicker'

const useStyles = makeStyles((theme) =>
  createStyles({
    calendarBox: {
      width: `calc(100% - ${theme.spacing(1)}px)`,
      padding: theme.spacing(2),
      [theme.breakpoints.only('xs')]: {
        width: '100vw',
        padding: theme.spacing(0, 4),
      },
    },
    arrowPickers: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
)

export type CalendarViewProps = {
  acceptPeriod: () => void
}
export default function CalendarView({ acceptPeriod }: CalendarViewProps) {
  const classes = useStyles()
  const {
    startDate,
    endDate,
    set,
    can,
    popover: { closeResetCalendar },
  } = usePeriod()

  return (
    <Box className={classes.calendarBox} textAlign="center">
      <CloseModalButton onClose={closeResetCalendar} />
      <Grid container direction="row" justify="space-around">
        <Grid item xs={12} sm={6}>
          <CalendarPicker />
        </Grid>
        <Grid item xs={12} sm={5} className={classes.arrowPickers}>
          <Grid container direction="column" justify="space-evenly">
            <Grid item>
              <ArrowTimePicker
                showDate
                dateLabel="From"
                date={startDate}
                adjustHour={set.adjustStartHour}
                adjustMinute={set.adjustStartMinute}
                canAdjustHour={can.canAdjustStartHour}
                canAdjustMinute={can.canAdjustStartMinute}
              />
            </Grid>
            <Grid item>
              <ArrowTimePicker
                showDate
                dateLabel="To"
                date={endDate}
                adjustHour={set.adjustEndHour}
                adjustMinute={set.adjustEndMinute}
                canAdjustHour={can.canAdjustEndHour}
                canAdjustMinute={can.canAdjustEndMinute}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
