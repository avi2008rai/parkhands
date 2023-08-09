import _ from 'lodash'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TextFieldProps } from '@material-ui/core'

import ParkingSpace from 'components/parking-space/form/ParkingSpace'

export default function ParkingSpaceController(props: TextFieldProps) {
  const { control, errors } = useFormContext()

  return (
    <Controller
      name="parkingSpaceId"
      control={control}
      error={Boolean(errors.parkingSpaceId)}
      helperText={errors['parkingSpaceId']?.message}
      as={<ParkingSpace {...props} />}
    />
  )
}
