import _ from 'lodash'
import React from 'react'
import { format } from 'date-fns'
import { TextField, MenuItem, TextFieldProps } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    menuItem: {
      textAlign: 'center',
      display: 'block',
    },
    menuPaper: {
      maxHeight: '20rem',
    },
  }),
)

type SelectTimePickerProps = {
  intervals: number[]
  onChange?: (date: Date) => void
} & Omit<TextFieldProps, 'onChange'>

export default function SelectTimePicker({
  intervals,
  value,
  onChange,
  ...props
}: SelectTimePickerProps) {
  const classes = useStyles()
  return (
    <TextField
      select
      variant="outlined"
      fullWidth
      type="date"
      SelectProps={{
        MenuProps: {
          classes: {
            paper: classes.menuPaper,
          },
        },
      }}
      {...props}
      value={typeof value === 'number' ? value : (value as Date).getTime()}
      onChange={(e: React.ChangeEvent<{ value: string }>) => {
        if (typeof onChange === 'function') {
          onChange(new Date(e.target.value))
        }
      }}>
      {_.map(intervals, (time) => (
        <MenuItem key={time} value={time}>
          {format(new Date(time), 'HH:mm')}
        </MenuItem>
      ))}
    </TextField>
  )
}
