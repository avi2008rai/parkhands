import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Grid, Container } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'
import InvoiceList from 'components/billing/invoice/InvoiceList'

import BillingDetailsForm from './BillingDetailsForm'

export default function BillingPage() {
  const { t } = useTranslation(Domain.Pages)
  return (
    <Container maxWidth="lg">
      <Grid container justify="space-between" spacing={5}>
        <Grid item xs={12}>
          <Grid container direction="column" spacing={5}>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" paragraph>
                {t('billing_detail')}
              </Typography>
              <BillingDetailsForm />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" paragraph>
            {t('subscriptions_invoices')}
          </Typography>
          <Grid container direction="column">
            <Grid item xs={12}>
              <InvoiceList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
