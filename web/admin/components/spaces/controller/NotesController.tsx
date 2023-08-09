import React from 'react'
import { TextField } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

export default function NotesController() {
  const { errors, control } = useFormContext()
  const { t } = useTranslation(Domain.Slots)
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
      as={<TextField />}
    />
  )
}
