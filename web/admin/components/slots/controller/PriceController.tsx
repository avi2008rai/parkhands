import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextField, InputAdornment } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

import { Domain } from 'common/i18n/locale'

export default function PriceController() {
  const { t } = useTranslation(Domain.General)
  const { errors, control } = useFormContext()
  return (
    <Controller
      required
      size="small"
      type="number"
      control={control}
      variant="outlined"
      name="pricePerHour"
      label={t('price_per_hour')}
      error={Boolean(errors.pricePerHour)}
      helperText={errors.pricePerHour?.message}
      inputProps={{ step: 0.1 }}
      InputProps={{
        endAdornment: <InputAdornment position="end">&euro; / h</InputAdornment>,
      }}
      as={<TextField />}
    />
  )
}
