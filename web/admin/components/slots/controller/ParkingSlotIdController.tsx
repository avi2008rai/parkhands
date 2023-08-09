import React from 'react'
import { TextField } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

export default function ParkingSlotIdController() {
  const { errors, control } = useFormContext()

  return (
    <Controller
      required
      size="small"
      variant="outlined"
      name="slotId"
      label="Slot Number"
      control={control}
      error={Boolean(errors.slotId)}
      helperText={errors.slotId?.message}
      as={<TextField />}
    />
  )
}
