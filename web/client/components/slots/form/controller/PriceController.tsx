import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextField, TextFieldProps, InputAdornment } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

import { Domain } from 'common/i18n/locale'

export default function PriceController(props: TextFieldProps) {
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
      onChange={([event]: React.ChangeEvent<HTMLInputElement>[]) => {
        // Parse the value to float and pass it along.
        const floatValue = parseFloat(event.target.value)
        if (isNaN(floatValue)) {
          return event.target.value
        }
        return floatValue
      }}
      label={t('price_per_hour')}
      error={Boolean(errors.pricePerHour)}
      helperText={errors.pricePerHour?.message}
      inputProps={{ step: 0.1, min: 0 }}
      InputProps={{
        endAdornment: <InputAdornment position="end">&euro; / h</InputAdornment>,
      }}
      as={<TextField {...props} />}
    />
  )
}
