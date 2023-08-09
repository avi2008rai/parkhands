import React from 'react'

import FormAlert from './FormAlert'

type FormErrorProps = {
  error: string
  onClose?: (event: React.SyntheticEvent) => void
}

export default function FormError({ error, onClose }: FormErrorProps) {
  return (
    <FormAlert show alertProps={{ severity: 'error', onClose }}>
      {error}
    </FormAlert>
  )
}
