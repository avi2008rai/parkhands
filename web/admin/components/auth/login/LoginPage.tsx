import _ from 'lodash'
import React from 'react'
import { useRouter } from 'next/router'
import {
  Avatar,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Container,
  CircularProgress,
} from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { useForm } from 'react-hook-form'

import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

import Link from 'components/common/Link'
import AnonymousLayout from 'components/layout/AnonymousLayout'
import ParkhandsLogo from 'components/common/ParkhandsLogo'

import useStyles from './styles'
import validationSchema from './validation'
import setJwtCookie, { redirectToPathname } from 'common/utils/setJwtCookie'
import routes from 'common/routes'
import useFormError from 'components/common/hooks/useFormError'
import { useLoginMutation, LoginInputRecordInput } from 'gql/schema'
import LoginLinks from './LoginLinks'

type LoginFormData = {
  email: string
  password: string
  rememberMe: boolean
}

function LoginPage() {
  const { t } = useTranslation(Domain.Register)
  const classes = useStyles()
  const router = useRouter()
  const redirect = router.asPath === routes.login ? routes.dashboard : router.asPath
  const { FormError, setError, resetError } = useFormError()
  const [loginHandler] = useLoginMutation()
  const { register, handleSubmit, errors, formState } = useForm<LoginFormData>({
    mode: 'onBlur',
    validationSchema,
  })
  const loading = formState.isSubmitting

  const onSubmit = handleSubmit(async (values, event) => {
    event?.preventDefault()
    resetError()
    try {
      const payload: LoginInputRecordInput = {
        email: values.email,
        password: values.password,
        // eslint-disable-next-line @typescript-eslint/camelcase
        rememberMe: values.rememberMe,
      }
      const { data } = await loginHandler({ variables: { payload } })
      if (data?.login?.jwtToken) {
        setJwtCookie(data.login.jwtToken)
        redirectToPathname(redirect as string)
      }
    } catch (error) {
      setError(_.get(error, 'graphQLErrors[0].message'))
    }
  })

  return (
    <AnonymousLayout title="Login">
      <Container maxWidth="sm" className={classes.loginFormWrapper}>
        <div className={classes.paper}>
          <div>
            <ParkhandsLogo variant="fixed" size="medium" />
          </div>

          <form className={classes.form} noValidate onSubmit={onSubmit} method="POST">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  inputRef={register}
                  helperText={errors.email?.message}
                  id="email"
                  name="email"
                  variant="outlined"
                  autoComplete="email"
                  label={t('email')}
                  error={Boolean(errors.email)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  inputRef={register}
                  helperText={errors.password?.message}
                  id="password"
                  label={t('password')}
                  name="password"
                  type="password"
                  variant="outlined"
                  autoComplete="current-password"
                  error={Boolean(errors.password)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  inputRef={register}
                  name="remember_me"
                  control={<Checkbox value="remmemberMe" color="secondary" />}
                  label={t('remember_me')}
                />
              </Grid>
              <Grid item xs={12}>
                <FormError />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <LoginLinks />
            </Grid>
            <Button
              fullWidth
              color="secondary"
              type="submit"
              variant="contained"
              disabled={loading}
              className={classes.submit}
              size="large">
              {t('sign_in')}
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>
          </form>
        </div>
      </Container>
    </AnonymousLayout>
  )
}

export default () => <LoginPage />
