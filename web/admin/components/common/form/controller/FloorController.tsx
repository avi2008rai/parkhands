import React from 'react'
import { TextFieldProps, TextField } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

export default function FloorController() {

  const { errors, control } = useFormContext()
  const { t } = useTranslation(Domain.Register)

  return (
    <Controller
      required
      size="small"
      type="number"
      variant="outlined"
      name="level"
      label={t('Floor')}
      control={control}
      error={Boolean(errors.level)}
      as={<TextField />}
      helperText={errors.level?.message}
    />
  )
}
