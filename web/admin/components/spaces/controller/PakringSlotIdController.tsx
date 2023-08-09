import React from 'react'
import { TextFieldProps, TextField } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'
import {Domain} from  'common/i18n/locale'
import { useTranslation } from 'react-i18next'

export default function PakringSlotIdController() {
  const { errors, control } = useFormContext()
  const { t } = useTranslation(Domain.Slots)

  return (
    <Controller
      required
      size="small"
      variant="outlined"
      name="slotId"
      label={t('slot_number')}
      control={control}
      error={Boolean(errors.slotId)}
      helperText={errors.slotId?.message}
      as={<TextField />}
    />
  )
}
