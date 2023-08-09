import React from 'react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { InputLabel, FormHelperText, FormControl } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'

import VehicleTypeController from '../VehicleTypeController'

export default function VehicleTypeField({ label = 'vehicle_type' }: { label?: string }) {
  const { t } = useTranslation(Domain.Pages)
  const { errors } = useFormContext()
  return (
    <FormControl>
      <InputLabel margin="dense" variant="outlined" id="vehicle-type-id-label">
        {t(label)}
      </InputLabel>
      <VehicleTypeController label={t(label)} labelId="vehicle-type-id-label" />
      <FormHelperText variant="outlined" error={Boolean(errors.vehicleTypeId?.message)}>
        {errors.vehicleTypeId?.message}
      </FormHelperText>
    </FormControl>
  )
}
