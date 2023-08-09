import React from 'react'
import { ErrorProps } from 'next/error'
import { EventBusy } from '@material-ui/icons'
import { Button, Typography, Avatar, Grid } from '@material-ui/core'

import routes from 'common/routes'

import useStyles from './styles'
import PageDialog from 'components/common/PageDialog'
import { useDomain, Domain } from 'common/i18n'
import LinkButton from 'components/common/LinkButton'

const statusCodes: { [code: number]: string } = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
}

const defaultError = 'error_unexpected_occurred'

export default function ErrorPage({ statusCode = 404, title }: ErrorProps) {
  const classes = useStyles()
  const t = useDomain([Domain.Validation, Domain.General])
  return (
    <PageDialog closeToDashboard maxWidth="xs">
      <Grid container spacing={5} direction="column" justify="center">
        <Grid item>
          <Avatar className={classes.avatar}>
            <EventBusy fontSize="large" />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography component="h1" variant="h1" paragraph>
            {statusCode}
          </Typography>
          <Typography component="h1" variant="h4" paragraph>
            {t(title || statusCodes[statusCode] || defaultError)}
          </Typography>
        </Grid>
        <Grid item>
          <LinkButton href={routes.dashboard} variant="contained" color="primary">
            {t('go_dashboard')}
          </LinkButton>
        </Grid>
      </Grid>
    </PageDialog>
  )
}
