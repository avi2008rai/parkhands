import _ from 'lodash'
import { format } from 'date-fns'
import React, { useCallback, useMemo } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons'
import { Grid, Box, IconButton, Typography, Button, ButtonGroup } from '@material-ui/core'

import { colors } from 'common/theme'
import { Domain, useDomain } from 'common/i18n'
import { useCalendar } from 'components/calendar/useCalendar'

const useStyles = makeStyles((theme) =>
  createStyles({
    digits: {
      fontSize: theme.typography.pxToRem(24),
      fontWeight: 'bold',
      lineHeight: theme.typography.pxToRem(25),
    },
    amPmContainer: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      fontSize: theme.typography.pxToRem(16),
    },
    amPm: {
      color: colors.textLight,
      fontWeight: 'bolder',
    },
    selected: {
      color: theme.palette.common.white,
      fontWeight: 'bolder',
    },
    dateLabel: {
      textAlign: 'left',
      fontSize: theme.typography.pxToRem(12),
    },
    dateString: {
      textAlign: 'left',
      fontSize: theme.typography.pxToRem(16),
    },
  }),
)
const [stepHour, stepMinute] = [1, 5]

const AmPmContainer = () => {
  const classes = useStyles()
  const {
    date,
    can: { canAdjustHour },
    set: { adjustHour },
  } = useCalendar()

  const amPm = useMemo(() => format(date, 'a'), [date])
  return (
    <Box className={classes.amPmContainer}>
      <ButtonGroup disableRipple orientation="vertical" variant="text" color="default">
        <Button
          fullWidth
          // We don't change the hour if it's before the min time
          // This needs visual feedback for the user
          onClick={() => canAdjustHour(12) && adjustHour(12)}
          disabled={amPm === 'AM'}
          className={amPm === 'AM' ? classes.selected : classes.amPm}>
          AM
        </Button>
        <Button
          fullWidth
          // We don't change the hour if it's before the min time
          // This needs visual feedback for the user
          onClick={() => canAdjustHour(-12) && adjustHour(-12)}
          disabled={amPm === 'PM'}
          className={amPm === 'PM' ? classes.selected : classes.amPm}>
          PM
        </Button>
      </ButtonGroup>
    </Box>
  )
}

type DisplayDateProps = {
  date: Date
  timeFormat?: string
  step: number
  onWheel: (value: number) => void
}

const DisplayDate = ({ date, onWheel, step, timeFormat = 'h' }: DisplayDateProps) => {
  const classes = useStyles()

  // Throttle wheel hour manipulation
  const throttleWheel = useCallback(
    _.throttle((delta: number) => {
      onWheel(delta > 0 ? -step : step)
    }, 200),
    [onWheel],
  )
  return (
    <Typography
      className={classes.digits}
      onWheel={(e: React.WheelEvent) => throttleWheel(e.deltaY)}>
      {format(date, timeFormat)}
    </Typography>
  )
}

type ArrowTimePickerProps = {
  showAmPm?: boolean
  showDate?: boolean
  date: Date
  dateLabel?: string
  adjustHour: (hour: number) => void
  adjustMinute: (minute: number) => void
  canAdjustHour: (hour: number) => boolean
  canAdjustMinute: (minute: number) => boolean
}
export default function ArrowTimePicker({
  showAmPm = false,
  showDate = false,
  dateLabel,
  date,
  adjustHour,
  adjustMinute,
  canAdjustHour,
  canAdjustMinute,
}: ArrowTimePickerProps) {
  const classes = useStyles()
  const t = useDomain(Domain.Forms)
  const xsDate = showDate ? 3 : 6
  return (
    <Grid container direction="row" justify="space-evenly">
      <Grid item xs={showAmPm ? 9 : 12}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Grid container direction="row" spacing={0} alignItems="flex-end">
              {showDate && (
                <Grid item xs={6}>
                  {dateLabel && (
                    <Typography className={classes.dateLabel}>{t(dateLabel)}</Typography>
                  )}
                </Grid>
              )}
              <Grid item xs={xsDate}>
                <IconButton size="small" onClick={() => adjustHour(stepHour)}>
                  <KeyboardArrowUp />
                </IconButton>
              </Grid>
              <Grid item xs={xsDate}>
                <IconButton size="small" onClick={() => adjustMinute(stepMinute)}>
                  <KeyboardArrowUp />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={0} alignItems="center">
              {showDate && (
                <Grid item xs={6}>
                  <Typography className={classes.dateString} color="secondary" noWrap>
                    {format(date, 'LLLL dd')}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={xsDate}>
                <DisplayDate
                  date={date}
                  timeFormat={showAmPm ? 'h' : 'HH'}
                  onWheel={adjustHour}
                  step={stepHour}
                />
              </Grid>
              <Grid item xs={xsDate}>
                <DisplayDate date={date} timeFormat="mm" onWheel={adjustMinute} step={stepMinute} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={0} alignItems="center">
              {showDate && <Grid item xs={6}></Grid>}
              <Grid item xs={xsDate}>
                <IconButton
                  size="small"
                  // Disable button if the new time will be before min time
                  disabled={!canAdjustHour(-stepHour)}
                  onClick={() => adjustHour(-stepHour)}>
                  <KeyboardArrowDown />
                </IconButton>
              </Grid>
              <Grid item xs={xsDate}>
                <IconButton
                  size="small"
                  // Disable button if the new time will be before min time
                  disabled={!canAdjustMinute(-stepMinute)}
                  onClick={() => adjustMinute(-stepMinute)}>
                  <KeyboardArrowDown />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {showAmPm && (
        <Grid item xs={3}>
          <AmPmContainer />
        </Grid>
      )}
    </Grid>
  )
}
