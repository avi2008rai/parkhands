import React, { useCallback, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import DialogSubmitButton from 'components/common/form/DialogSubmitButton'
import ActionDialog, { ActionDialogProps } from 'components/common/ActionDialog'

import CalendarGrid from './CalendarGrid'

const useStyles = makeStyles((theme) =>
  createStyles({
    submitButton: {
      '&:disabled': {
        background: 'none',
        backgroundColor: theme.palette.grey[500],
        color: theme.palette.getContrastText(theme.palette.grey[500]),
      },
    },
  }),
)

type CalendarDialogProps = ActionDialogProps & {
  startTime: Date
  endTime: Date
  slotId: string
  onSelectedRange?: (start: Date, end: Date) => void
}
export default function CalendarDialog({
  slotId,
  onSelectedRange,
  startTime,
  endTime,
  ...props
}: CalendarDialogProps) {
  const classes = useStyles()
  const [selectedStart, setSelectedStart] = useState<Date>(startTime)
  const [selectedEnd, setSelectedEnd] = useState<Date>(endTime)
  const [invalidSelection, setInvalidSelection] = useState(false)

  const submitDates = useCallback(() => {
    // Trigger event handlers
    if (typeof onSelectedRange === 'function') {
      onSelectedRange(selectedStart, selectedEnd)
    }
  }, [selectedStart, selectedEnd])

  return (
    <ActionDialog
      flex
      disableBackdropClick={false}
      disableEscapeKeyDown={false}
      headerLabel="select_time_period"
      {...props}>
      <Box flexGrow={12}>
        <CalendarGrid
          slotId={slotId}
          selectedStart={new Date(selectedStart)}
          selectedEnd={new Date(selectedEnd)}
          onChangeStart={setSelectedStart}
          onChangeEnd={setSelectedEnd}
          onInvalidSelection={setInvalidSelection}
        />
      </Box>
      <DialogSubmitButton
        label="Select"
        color="secondary"
        onClick={submitDates}
        disabled={invalidSelection}
        className={classes.submitButton}
      />
    </ActionDialog>
  )
}
