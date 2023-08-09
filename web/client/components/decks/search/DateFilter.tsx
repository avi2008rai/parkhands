import { useTranslation } from 'react-i18next'
import { Grid, useMediaQuery } from '@material-ui/core'
import React, { useCallback, useRef } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

import { Domain } from 'common/i18n'
import { useFilters } from 'components/hooks/useFilters'
import { usePeriod } from 'components/calendar/usePeriod'
import DateTimeTextField from 'components/form/DateTimeTextField'
import CalendarPopover from 'components/calendar/CalendarPopover'
import CalendarViewDialog from 'components/calendar/CalendarViewDialog'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dateRoot: {
      '& > .MuiGrid-item': {
        padding: 0,
        margin: 0,
        paddingLeft: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
          paddingLeft: theme.spacing(2),
          paddingBottom: theme.spacing(1.5),
        },
      },
      '& > .MuiGrid-item + .MuiGrid-item:before': {
        [theme.breakpoints.between('xs', 'sm')]: {
          content: '""',
          position: 'absolute',
          left: 0,
          top: theme.spacing(2),
          bottom: theme.spacing(2),
          borderLeft: '1px solid #D9D9D9',
        },
      },
    },
    dateItem: {
      position: 'relative',
      '&:before': {
        [theme.breakpoints.up('md')]: {
          content: '""',
          position: 'absolute',
          left: 0,
          top: theme.spacing(2),
          bottom: theme.spacing(1),
          borderLeft: '1px solid #D9D9D9',
        },
      },
    },
    timeField: {
      margin: 0,
      marginLeft: theme.spacing(1),
      fontSize: theme.typography.pxToRem(12),
    },
  }),
)

type DateFilterProps = {}
export default function DateFilter({}: DateFilterProps) {
  const classes = useStyles()
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'))
  const calendarRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation([Domain.Forms, Domain.General])

  const {
    time: { start, end },
    setStartTime: setFilterStart,
    setEndTime: setFilterEnd,
  } = useFilters()

  const {
    startDate,
    endDate,
    popover: { openCalendar, closeCalendar },
  } = usePeriod()

  const onPeriodChange = useCallback(() => {
    setFilterStart(startDate)
    setFilterEnd(endDate)
    closeCalendar()
  }, [setFilterStart, setFilterEnd, startDate, endDate, closeCalendar])

  return (
    <Grid container direction="row" className={classes.dateRoot} ref={calendarRef}>
      <Grid item xs={6} className={classes.dateItem}>
        <DateTimeTextField
          margin="dense"
          value={start}
          label={t('From')}
          color="primary"
          variant="standard"
          className={classes.timeField}
          onClick={openCalendar}
        />
      </Grid>
      <Grid item xs={6} className={classes.dateItem}>
        <DateTimeTextField
          margin="dense"
          value={end}
          label={t('To')}
          color="primary"
          variant="standard"
          className={classes.timeField}
          onClick={openCalendar}
        />
      </Grid>
      {mobile ? (
        <CalendarViewDialog anchorEl={calendarRef} acceptPeriod={onPeriodChange} />
      ) : (
        <CalendarPopover anchorEl={calendarRef} acceptPeriod={onPeriodChange} />
      )}
    </Grid>
  )
}
