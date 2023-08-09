import React from 'react'
import { Grid } from '@material-ui/core'
import { AlertProps } from '@material-ui/lab'

import FormAlert from 'components/alert/FormAlert'
import { useDomain, Domain } from 'common/i18n'

export type FormErrorProps = {
  error?: string
  grid?: boolean
  onClose?: (event: React.SyntheticEvent) => void
} & Pick<AlertProps, 'severity'>

export default function FormError({
  severity = 'error',
  grid = false,
  error,
  onClose,
}: FormErrorProps) {
  const t = useDomain(Domain.Validation)

  if (!error) {
    return null
  }

  const alert = (
    <FormAlert show alertProps={{ severity, onClose }}>
      {t(error)}
    </FormAlert>
  )

  if (grid) {
    return <Grid item>{alert}</Grid>
  }

  return alert
}
