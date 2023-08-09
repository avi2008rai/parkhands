import React from 'react'
import { TextFieldProps } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

import CountryField from './CountryField'

type TextFieldControllerProps = {
  name: string
} & TextFieldProps

export default function CountryFieldController({ name, ...props }: TextFieldControllerProps) {
  const { control, errors } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      error={Boolean(errors?.address?.country)}
      helperText={errors?.address?.country?.message}
      as={<CountryField {...props} />}
    />
  )
}
