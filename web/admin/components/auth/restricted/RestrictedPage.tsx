import React from 'react'
import getConfig from 'next/config'
import { makeStyles } from '@material-ui/core/styles'
import { LockOutlined } from '@material-ui/icons'
import { Avatar, Typography, Container, Button } from '@material-ui/core'

import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

import AnonymousLayout from 'components/layout/AnonymousLayout'
import LinkButton from 'components/common/LinkButton'

const {
  publicRuntimeConfig: { CLIENT_URL },
} = getConfig()

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
  },
}))

function RestrictedPage() {
  const classes = useStyles()
  const { t } = useTranslation(Domain.Register)

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography variant="h2" paragraph>
        {t('restricted_area', { ns: Domain.General })}
      </Typography>
      <Typography variant="h4" paragraph>
        {t('no_resource_access', { ns: Domain.General })}
      </Typography>
      <Button color="primary" variant="contained" href={CLIENT_URL}>
        {t('visit_parkhands', { ns: Domain.General })}
      </Button>
    </div>
  )
}

export default () => (
  <AnonymousLayout title="Register">
    <Container maxWidth="sm">
      <RestrictedPage />
    </Container>
  </AnonymousLayout>
)
