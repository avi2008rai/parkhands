import React from 'react'
import { TextField } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

export default function EmailController() {
  const { t } = useTranslation(Domain.User)
  const { errors, control } = useFormContext()
  return (
    <Controller
      required
      error={Boolean(errors.email)}
      helperText={errors.email?.message}
      name="email"
      size="small"
      label={t('email')}
      variant="outlined"
      control={control}
      autoComplete="off"
      as={<TextField />}
    />
  )
}
