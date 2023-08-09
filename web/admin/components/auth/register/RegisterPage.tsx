import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { LockOutlined } from '@material-ui/icons'
import { Avatar, Typography, Grid, TextField, Button, Container } from '@material-ui/core'

import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

import Link from 'components/common/Link'
import AnonymousLayout from 'components/layout/AnonymousLayout'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 3),
  },
}))

function RegisterPage() {
  const { t } = useTranslation(Domain.Register)
  const classes = useStyles()

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography variant="h2"> {t('sign_up', { ns: Domain.Register })}</Typography>
      <form className={classes.form} noValidate onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="first_name"
              autoFocus
              fullWidth
              id="firstName"
              label={t('first_name')}
              name="firstName"
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="last_name"
              fullWidth
              id="lastName"
              label={t('last_name')}
              name="lastName"
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="email"
              fullWidth
              id="email"
              label={t('email')}
              name="email"
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="current-password"
              fullWidth
              id="password"
              label={t('password')}
              name="password"
              required
              type="password"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          color="primary"
          type="submit"
          variant="contained"
          className={classes.submit}>
          {t('sign_up')}
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/login">{t('existing_account')}</Link>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default () => (
  <AnonymousLayout title="Register">
    <Container maxWidth="sm">
      <RegisterPage />
    </Container>
  </AnonymousLayout>
)
