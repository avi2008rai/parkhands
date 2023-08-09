import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Grid, Container } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'

import TermsOfService from './TermsOfService'

export default function TermsPage() {
  const { t } = useTranslation(Domain.Pages)

  return (
    <Container maxWidth="md">
      <Grid container justify="space-between">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h1" paragraph>
              {t('Nutzungsbedingungen')}
            </Typography>
          </Grid>
          <Grid item>
            <TermsOfService />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
