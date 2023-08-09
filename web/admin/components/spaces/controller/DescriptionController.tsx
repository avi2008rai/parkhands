import React from 'react'
import { TextField } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

export default function DescriptionController() {
  const { t } = useTranslation(Domain.Slots)
  const { errors, control } = useFormContext()
  return (
    <Controller
      multiline
      rows="4"
      size="small"
      variant="outlined"
      name="description"
      label={t('parking_rules')}
      placeholder="Describe the parking rules here that will apply to all the slots in the parking space."
      control={control}
      error={Boolean(errors.description)}
      helperText={errors.description?.message}
      as={<TextField />}
    />
  )
}
