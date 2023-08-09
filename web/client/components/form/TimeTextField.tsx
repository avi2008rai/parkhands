import _ from 'lodash'
import { format } from 'date-fns'
import { TextField, TextFieldProps } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useCallback } from 'react'

import { useCalendar } from 'components/calendar/useCalendar'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      color: 'inherit',
      cursor: 'pointer',
      textAlign: 'center',
      fontSize: theme.typography.pxToRem(20),
      lineHeight: theme.typography.pxToRem(25),
      caretColor: 'transparent',
    },
  }),
)

export type TimeTextFieldProps = {
  onChange?: (date: Date) => void
} & Omit<TextFieldProps, 'onChange'>
export default function TimeTextField({ onChange, disabled, value, ...props }: TimeTextFieldProps) {
  const classes = useStyles()
  const {
    date,
    set: { setDate },
    popover: { openCalendar },
  } = useCalendar()

  const clickHandler = useCallback(() => {
    if (!disabled) {
      // Open calendar only if field is enabled
      openCalendar()
    }
  }, [disabled, openCalendar])

  useEffect(() => {
    // Trigger event handlers
    if (typeof onChange === 'function') {
      onChange(date)
    }
  }, [date])

  useEffect(() => {
    // Update Calendar context with a new date based on the value
    if (value instanceof Date) {
      setDate(value)
    }
  }, [value])

  return (
    <TextField
      fullWidth
      type="text"
      variant="outlined"
      disabled={disabled}
      onClick={clickHandler}
      InputProps={{ readOnly: true }}
      inputProps={{ className: classes.root }}
      {...props}
      value={value instanceof Date ? format(value, 'HH:mm') : '---'}
    />
  )
}
