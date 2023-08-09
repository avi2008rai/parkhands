import React from 'react'
import { SelectProps, TextField } from '@material-ui/core'

type PreviewOwnerProps = {
  name?: string
  email?: string
} & Pick<SelectProps, 'label'>

/**
 * This field is used only for preview readonly purpose
 * It's not registered in the forms so it's value doesn't affect
 * the form validation or outcome values
 */
export default function PreviewOwnerField({
  name,
  email,
  label = 'Account Owner',
}: PreviewOwnerProps) {
  return (
    <TextField
      disabled
      size="small"
      label={label}
      variant="outlined"
      value={`${name} (${email})`}
    />
  )
}
