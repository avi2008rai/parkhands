import _ from 'lodash'
import React, { useEffect } from 'react'
import { Popover } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { usePeriod } from 'components/calendar/usePeriod'
import SubmitButton from 'components/common/form/SubmitButton'

import CalendarView, { CalendarViewProps } from './CalendarView'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(3),
      },
    },
    paper: {
      textAlign: 'center',
      width: '45rem',
      padding: theme.spacing(2, 0),
    },
    selectBtn: {
      maxWidth: theme.spacing(30),
      margin: theme.spacing(2, 0, 1),
    },
  }),
)

type CalendarPopoverProps = {
  anchorEl: React.RefObject<HTMLInputElement>
} & CalendarViewProps
export default function CalendarPopover({ acceptPeriod, anchorEl }: CalendarPopoverProps) {
  const classes = useStyles()
  const {
    popover: { open, openCalendar, closeResetCalendar },
  } = usePeriod()

  useEffect(() => {
    !anchorEl && openCalendar()
    return () => closeResetCalendar()
  }, [anchorEl])

  const id = open ? 'time-picker' : undefined
  return (
    <Popover
      id={id}
      open={open}
      onClose={close}
      onBackdropClick={closeResetCalendar}
      classes={{
        root: classes.root,
        paper: classes.paper,
      }}
      anchorEl={anchorEl.current}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <CalendarView acceptPeriod={acceptPeriod} />
      <SubmitButton
        size="small"
        className={classes.selectBtn}
        fullWidth
        label="Select"
        onClick={acceptPeriod}
      />
    </Popover>
  )
}
