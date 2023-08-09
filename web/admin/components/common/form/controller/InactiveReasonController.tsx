import React from 'react'
import { TextField } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

export default function InactiveReasonController() {
  const { control } = useFormContext()

  return (
    <Controller
      multiline
      rows="4"
      size="small"
      variant="outlined"
      name="businessStatusReason"
      label="Status Inactive"
      control={control}
      as={<TextField />}
    />
  )
}
