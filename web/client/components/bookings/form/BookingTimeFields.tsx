import { format } from 'date-fns'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { Domain } from 'common/i18n/locale'
import CalendarDialog from 'components/calendar/CalendarDialog'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    timeSchedule: {
      fontSize: theme.typography.pxToRem(12),
      [theme.breakpoints.up('xs')]: {
        marginLeft: theme.spacing(0),
      },
    },
    timeField: {
      color: theme.palette.secondary.main,
      cursor: 'pointer',
    },
  }),
)
type BookingTimeFieldsProps = {
  slotId: string
}
const dateFormat = 'MM/dd/yyyy HH:mm'

export default function BookingTimeFields({ slotId }: BookingTimeFieldsProps) {
  const classes = useStyles()
  const { t } = useTranslation(Domain.Forms)
  const [open, setOpen] = useState(false)
  const { watch, setValue } = useFormContext()
  const { startTime, endTime } = watch(['startTime', 'endTime'])

  const openCalendar = () => setOpen(true)
  const closeCalendar = () => setOpen(false)
  const setSelectedRange = (start: Date, end: Date) => {
    setValue('startTime', start)
    setValue('endTime', end)
    setOpen(false)
  }

  return (
    <Grid container direction="row">
      <Grid item xs={6}>
        <Typography align="left" className={classes.timeSchedule}>
          {t('From')}
        </Typography>
        <Typography onClick={openCalendar} align="left" className={classes.timeField}>
          {format(startTime, dateFormat)}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography align="left" className={classes.timeSchedule}>
          {t('To')}
        </Typography>
        <Typography onClick={openCalendar} align="left" className={classes.timeField}>
          {format(endTime, dateFormat)}
        </Typography>
      </Grid>
      <CalendarDialog
        open={open}
        slotId={slotId}
        startTime={startTime}
        endTime={endTime}
        onClose={closeCalendar}
        onSelectedRange={setSelectedRange}
      />
    </Grid>
  )
}
