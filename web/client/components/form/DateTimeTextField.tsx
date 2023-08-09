import _ from 'lodash'
import { format } from 'date-fns'
import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { TextField, StandardTextFieldProps, useMediaQuery, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      color: 'inherit',
      cursor: 'pointer',
      textAlign: 'center',
      fontSize: 'inherit',
      caretColor: 'transparent',
    },
    input: {
      cursor: 'pointer',
      marginTop: theme.spacing(1),
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    label: {
      cursor: 'pointer',
      display: 'block',
      color: '#AAB5BE',
      paddingTop: theme.spacing(1.75),
      '& + .MuiInput-formControl': {
        marginTop: theme.spacing(2),
      },
    },
  }),
)

export default function DateTimeTextField({ value, ...props }: StandardTextFieldProps) {
  const classes = useStyles()
  const medium = useMediaQuery((theme: Theme) => theme.breakpoints.between('sm', 'md'))

  const dateFormat = medium ? 'HH:mm' : 'LLL d, HH:mm'

  return (
    <TextField
      fullWidth
      type="text"
      variant="standard"
      {...props}
      InputProps={{
        readOnly: true,
        classes: {
          root: classes.root,
          input: classes.input,
        },
        disableUnderline: true,
        ...props.InputProps,
      }}
      InputLabelProps={{
        classes: { root: classes.label },
        ...props.InputLabelProps,
      }}
      value={value instanceof Date ? format(value, dateFormat) : '---'}
    />
  )
}
