import { useTranslation } from 'react-i18next'
import React from 'react'
import { Typography, Grid, Box } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'

type SlotDetailsSectionProps = React.PropsWithChildren<{
  label?: string
}>
export default function SlotDetailsSection({ label, children }: SlotDetailsSectionProps) {
  const { t } = useTranslation(Domain.Forms)
  return (
    <Grid item>
      {label && (
        <Typography variant="h5" gutterBottom>
          <strong>{t(label)}</strong>
        </Typography>
      )}
      {children}
    </Grid>
  )
}
