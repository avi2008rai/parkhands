import _ from 'lodash'
import Stripe from 'stripe'
import { format } from 'date-fns'
import React, { useEffect } from 'react'
import {
  Grid,
  Button,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  LinearProgress,
} from '@material-ui/core'

import { useFetch } from 'components/hooks/useFetch'
import { InsertDriveFile, OpenInNew } from '@material-ui/icons'
import { useDomain, Domain } from 'common/i18n'

export default function InvoiceList() {
  const t = useDomain(Domain.Pages)
  const [fetchInvoices, { loading, data }] = useFetch<{ data: Stripe.Subscription[] }>({
    method: 'GET',
    baseUrl: '/api/subscription',
  })

  useEffect(() => {
    fetchInvoices()
  }, [])

  if (loading) {
    return <LinearProgress color="secondary" />
  }

  return (
    <TableContainer>
      <Table aria-label="subscriptions table">
        <TableHead>
          <TableRow>
            <TableCell align="center">{t('start_date')}</TableCell>
            <TableCell align="center">{t('end_date')}</TableCell>
            <TableCell align="center">{t('amount')}</TableCell>
            <TableCell align="center">{t('status')}</TableCell>
            <TableCell align="center">{t('actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(data?.data, (subscription: Stripe.Subscription) => {
            const invoice = subscription.latest_invoice as Stripe.Invoice
            return (
              <TableRow key={subscription.id}>
                <TableCell align="center">
                  <Typography variant="subtitle2">
                    {format(new Date(subscription.current_period_start * 1000), 'PP')}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2">
                    {format(new Date(subscription.current_period_end * 1000), 'PP')}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2">
                    {subscription.plan?.currency.toUpperCase()}{' '}
                    {(subscription.plan?.amount || 0) / 100}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2">{_.startCase(subscription.status)}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Grid container direction="row" alignContent="center" justify="center">
                    <Grid item>
                      {invoice.hosted_invoice_url && (
                        <Button
                          target="_blank"
                          variant="outlined"
                          size="small"
                          rel="noopener noreferrer"
                          startIcon={<OpenInNew />}
                          href={invoice.hosted_invoice_url}>
                          {t('view_online')}
                        </Button>
                      )}
                    </Grid>
                    <Grid item>
                      {invoice.invoice_pdf && (
                        <Button
                          target="_blank"
                          variant="outlined"
                          size="small"
                          rel="noopener noreferrer"
                          startIcon={<InsertDriveFile />}
                          href={invoice.invoice_pdf}>
                          {t('download_pdf')}
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
