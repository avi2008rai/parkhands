import _ from 'lodash'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TextFieldProps } from '@material-ui/core'

import VehicleTypeSelect from 'components/vehicle/form/VehicleTypeSelect'

export default function VehicleTypeController(props: TextFieldProps) {
  const { control, errors } = useFormContext()

  return (
    <Controller
      name="vehicleTypeId"
      control={control}
      error={Boolean(errors.vehicleTypeId)}
      helperText={errors['vehicleTypeId']?.message}
      as={<VehicleTypeSelect {...props} />}
    />
  )
}
