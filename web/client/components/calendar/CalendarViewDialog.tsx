import _ from 'lodash'
import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { usePeriod } from 'components/calendar/usePeriod'
import ActionDialog from 'components/common/ActionDialog'
import DialogSubmitButton from 'components/common/form/DialogSubmitButton'

import CalendarView, { CalendarViewProps } from './CalendarView'

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      maxWidth: '45rem',
    },
  }),
)

type CalendarViewDialogProps = {
  anchorEl: React.RefObject<HTMLInputElement>
} & CalendarViewProps
export default function CalendarViewDialog({ acceptPeriod, anchorEl }: CalendarViewDialogProps) {
  const classes = useStyles()
  const {
    popover: { open, openCalendar, closeResetCalendar },
  } = usePeriod()

  useEffect(() => {
    !anchorEl && openCalendar()
    return () => closeResetCalendar()
  }, [anchorEl])

  return (
    <ActionDialog
      flex
      open={open}
      classes={{ paper: classes.paper }}
      onClose={closeResetCalendar}
      headerLabel="select_period">
      <Box flexGrow={12} display="flex" alignItems="center">
        <CalendarView acceptPeriod={acceptPeriod} />
      </Box>
      <DialogSubmitButton label="Select" color="secondary" onClick={acceptPeriod} />
    </ActionDialog>
  )
}
