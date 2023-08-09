import _ from 'lodash'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TextFieldProps } from '@material-ui/core'

import VehicleSizeSelect from 'components/vehicle/form/VehicleSizeSelect'

export default function VehicleSizeController(props: TextFieldProps) {
  const { control, errors } = useFormContext()

  return (
    <Controller
      name="vehicleSizeId"
      control={control}
      error={Boolean(errors.vehicleSizeId)}
      helperText={errors['vehicleSizeId']?.message}
      as={<VehicleSizeSelect {...props} />}
    />
  )
}
