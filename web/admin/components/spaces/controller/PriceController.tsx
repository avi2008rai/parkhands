import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextField, InputAdornment } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

import { Domain } from 'common/i18n/locale'

export default function PriceController({ id, parentId }: any) {
  const { t } = useTranslation(Domain.General)
  const { errors, control } = useFormContext()
  return (
    <Controller
      required
      type="number"
      size="small"
      control={control}
      variant="outlined"
      name={`availability[${parentId}].openHours[${id}].price`}
      defaultValue={0}
      label="Price/hour"
      error={Boolean(errors.pricePerHour)}
      helperText={errors.pricePerHour?.message}
      InputProps={{
        endAdornment: <InputAdornment position="end">EUR</InputAdornment>,
      }}
      as={<TextField />}
    />
  )
}
