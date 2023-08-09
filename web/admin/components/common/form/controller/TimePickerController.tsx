import React from 'react'
import { TextField, Theme } from '@material-ui/core'
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles'
import { Controller, useFormContext } from 'react-hook-form'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    datePicker: {
      '& .MuiToolbar-gutters': {
        boxShadow: '0px 0px 20px 0px rgb(28 29 34 / 89%)',
      },
      '& .MuiTypography-h4': {
        fontSize: '1.8rem',
      },
      '& .MuiButton-textPrimary': {
        color: theme.palette.secondary.main,
      },
      '& .MuiPickersYear-yearSelected': {
        color: theme.palette.secondary.main,
      },
    },
  }),
)

export default function TimePickerController({ name, label, timeValue, onChangemethod }: any) {
  const classes = useStyles()
  const { control, errors } = useFormContext()
  return (
    <Controller
      fullWidth
      type="time"
      name={name}
      label={label}
      control={control}
      size="small"
      variant="outlined"
      defaultValue="10:11"
      InputLabelProps={{
        shrink: true,
      }}
      placeholder="Select Time"
      color={'secondary'}
      error={false}
      helperText={null}
      as={<TextField />}
    />
  )
}
