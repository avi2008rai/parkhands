import _ from 'lodash'
import React from 'react'
import { useRouter } from 'next/router'
import { Grid } from '@material-ui/core'
import { isApolloError } from '@apollo/client'
import { useFormContext, UseFormOptions } from 'react-hook-form'

import routes from 'common/routes'
import { useLoginMutation, LoginInputRecordInput } from 'gql/schema'
import useFormError from 'components/hooks/useFormError'
import EmailController from 'components/form/controller/EmailController'
import HiddenSubmitButton from 'components/common/form/HiddenSubmitButton'
import PasswordController from 'components/form/controller/PasswordController'
import setJwtCookie, { redirectToPathname, destroyJwtCookie } from 'common/utils/setJwtCookie'

import useStyles from '../authStyles'
import validationSchema from './validation'

export type LoginFormData = {
  email: string
  password: string
}
export const formOptions: UseFormOptions<LoginFormData> = {
  mode: 'onBlur',
  defaultValues: { email: '', password: '' },
  validationSchema,
}
type LoginFormProps = {
  formRef: React.Ref<HTMLFormElement>
  onSuccess?: (jwt: string) => void
  dense?: boolean
}
export default function LoginForm({ formRef, onSuccess, dense = false }: LoginFormProps) {
  const classes = useStyles({ dense })
  const router = useRouter()
  const { FormError, setError, resetError } = useFormError()
  const [loginHandler] = useLoginMutation({ context: { skipAuthorization: true } })
  const { handleSubmit } = useFormContext<LoginFormData>()

  const onSubmit = handleSubmit(async (values, event) => {
    event?.preventDefault()
    resetError()
    try {
      const payload: LoginInputRecordInput = {
        email: values.email,
        password: values.password,
        rememberMe: false,
      }
      const { data } = await loginHandler({ variables: { payload } })
      if (data?.login?.jwtToken) {
        setJwtCookie(data.login.jwtToken)
        if (onSuccess) {
          onSuccess(data.login.jwtToken)
        } else {
          const redirect = router.asPath === routes.login ? routes.dashboard : router.asPath
          redirectToPathname((router.query.redirect as string) || redirect)
        }
      }
    } catch (error) {
      if (isApolloError(error)) {
        const { networkError } = error
        if (
          networkError &&
          'statusCode' in networkError &&
          (networkError as { statusCode: number }).statusCode === 401
          // Ref. https://github.com/apollographql/apollo-link/issues/300#issuecomment-518445337
        ) {
          destroyJwtCookie()
        }
      }
      setError(_.get(error, 'graphQLErrors[0].message'))
    }
  })
  return (
    <form noValidate ref={formRef} method="POST" className={classes.form} onSubmit={onSubmit}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <EmailController margin="dense" size="medium" />
        </Grid>
        <Grid item>
          <PasswordController margin="dense" size="medium" />
        </Grid>
        <HiddenSubmitButton />
        <Grid item>
          <FormError />
        </Grid>
      </Grid>
    </form>
  )
}
