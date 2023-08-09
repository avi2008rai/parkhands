import _ from 'lodash'
import React, { useEffect } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Popover, Box } from '@material-ui/core'

import { useCalendar } from 'components/calendar/useCalendar'

import ArrowTimePicker from './ArrowTimePicker'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '14rem',
      padding: theme.spacing(2),
      [theme.breakpoints.only('xs')]: {
        width: '100vw',
      },
    },
  }),
)

type ArrowTimePopoverProps = {
  anchorEl: React.RefObject<HTMLInputElement>
}
export default function ArrowTimePopover({ anchorEl }: ArrowTimePopoverProps) {
  const classes = useStyles()
  const {
    date,
    popover: { open, openCalendar, closeCalendar },
    set: { adjustHour, adjustMinute },
    can: { canAdjustHour, canAdjustMinute },
  } = useCalendar()

  useEffect(() => {
    !anchorEl && openCalendar()
    return () => closeCalendar()
  }, [anchorEl])

  const id = open ? 'time-picker' : undefined
  return (
    <Popover
      id={id}
      open={open}
      onClose={close}
      onBackdropClick={closeCalendar}
      anchorEl={anchorEl.current}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Box className={classes.root} textAlign="center">
        <ArrowTimePicker {...{ date, adjustHour, adjustMinute, canAdjustHour, canAdjustMinute }} />
      </Box>
    </Popover>
  )
}
