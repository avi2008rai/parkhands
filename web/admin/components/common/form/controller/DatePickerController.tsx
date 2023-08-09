import React from 'react'
import { KeyboardDatePicker, MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { Controller, useFormContext } from 'react-hook-form'

import { Theme } from '@material-ui/core'
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles'

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

export default function DatePickerController({ name, label, dateValue, onChangemethod }: any) {
  const classes = useStyles()
  const { control, errors } = useFormContext()

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Controller
        name={name}
        control={control}
        error={Boolean(errors[name])}
        helperText={errors[name]?.message}
        defaultValue={dateValue}
        as={
          <KeyboardDatePicker
            // autoOk
            error={false}
            helperText={null}
            fullWidth
            disablePast
            variant="dialog"
            name={name}
            inputVariant="outlined"
            label={label}
            size="small"
            format="dd.MM.yyyy"
            value={null}
            onChange={(date) => onChangemethod(date)}
            DialogProps={{ className: classes.datePicker }}
            color={'secondary'}
            InputProps={{ readOnly: true }}
          />
        }
      />
    </MuiPickersUtilsProvider>
  )
}
