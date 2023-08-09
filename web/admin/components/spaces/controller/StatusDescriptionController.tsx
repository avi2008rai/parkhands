import React from 'react'
import { TextField } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

export default function StatusDescriptionController() {
  const { errors, control } = useFormContext()
 const { t } = useTranslation(Domain.Slots)
  return (
    <Controller
      multiline
      rows="4"
      size="small"
      variant="outlined"
      name="businessStatusReason"
      label={t('status_inactive')}
      
      control={control}
      error={Boolean(errors.description)}
      helperText={errors.description?.message}
      as={<TextField />}
    />
  )
}
