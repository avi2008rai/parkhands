import React from 'react'
import { Input, InputProps } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

type InputControllerProps = {
  name: string
} & InputProps

export default function InputController({ name, ...props }: InputControllerProps) {
  const { control } = useFormContext()
  return <Controller name={name} control={control} as={<Input disableUnderline {...props} />} />
}
