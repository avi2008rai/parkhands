import React from 'react'
import { TextFieldProps, TextField } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

type TextFieldControllerProps = {
  name: string
} & TextFieldProps

export default function TextFieldController({ name, ...props }: TextFieldControllerProps) {
  const { control, errors } = useFormContext()
  return (
    <Controller
      fullWidth
      name={name}
      size="small"
      variant="outlined"
      control={control}
      error={Boolean(errors[name])}
      helperText={errors[name]?.message}
      as={<TextField {...props} />}
    />
  )
}
