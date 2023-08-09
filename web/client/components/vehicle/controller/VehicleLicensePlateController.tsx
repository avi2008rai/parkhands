import _ from 'lodash'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TextFieldProps } from '@material-ui/core'

import VehicleLicensePlate from 'components/vehicle/form/VehicleLicensePlate'

export default function VehicleLicensePlateController(props: TextFieldProps) {
  const { control, errors } = useFormContext()

  return (
    <Controller
      name="licensePlate"
      control={control}
      error={Boolean(errors.licensePlate)}
      helperText={errors['licensePlate']?.message}
      as={<VehicleLicensePlate {...props} />}
    />
  )
}
