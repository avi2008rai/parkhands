import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'

export default function PhotoUrlInput() {
  const { control } = useFormContext()
  return <Controller name="photoUrl" control={control} as={<input type="hidden" />} />
}
