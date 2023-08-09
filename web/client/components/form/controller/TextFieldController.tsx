import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextFieldProps, TextField } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

import { Domain } from 'common/i18n/locale'

type TextFieldControllerProps = {
  name: string
} & TextFieldProps

export default function TextFieldController({ name, label, ...props }: TextFieldControllerProps) {
  const { t } = useTranslation(Domain.Forms)
  const { control, errors } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      error={Boolean(errors[name])}
      helperText={errors[name]?.message}
      label={typeof label === 'string' ? t(label) : label}
      as={<TextField fullWidth size="small" variant="outlined" {...props} />}
    />
  )
}
