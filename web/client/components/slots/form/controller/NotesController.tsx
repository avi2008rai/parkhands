import React from 'react'
import { TextField, TextFieldProps } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'

export default function NotesController(props: TextFieldProps) {
  const { errors, control } = useFormContext()

  const { t } = useTranslation(Domain.Forms)

  return (
    <Controller
      multiline
      rows="4"
      size="small"
      variant="outlined"
      name="notes"
      label={t('parking_rules')}
      control={control}
      error={Boolean(errors.notes)}
      helperText={errors.notes?.message}
      as={<TextField {...props} />}
    />
  )
}
