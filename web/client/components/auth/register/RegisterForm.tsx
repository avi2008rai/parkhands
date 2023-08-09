import _ from 'lodash'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Grid } from '@material-ui/core'
import { UseFormOptions, useFormContext } from 'react-hook-form'

import routes from 'common/routes'
import useFormError from 'components/hooks/useFormError'
import ConsentCheckbox from 'components/privacy/ConsentCheckbox'
import EmailController from 'components/form/controller/EmailController'
import HiddenSubmitButton from 'components/common/form/HiddenSubmitButton'
import setJwtCookie, { redirectToPathname } from 'common/utils/setJwtCookie'
import PasswordController from 'components/form/controller/PasswordController'
import { useRegisterMutation } from 'gql/schema'

import useStyles from '../authStyles'
import validationSchema from './validation'
import NewsletterCheckbox from 'components/privacy/NewsletterCheckbox'

type RegisterFormData = {
  email: string
  password: string
  confirmPassword: string
  acceptedTerms: boolean
  newsletter: boolean
}
export const formOptions: UseFormOptions<RegisterFormData> = {
  mode: 'onBlur',
  validationSchema,
  defaultValues: {
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
    newsletter: false,
  },
}
type RegisterFormProps = {
  formRef: React.Ref<HTMLFormElement>
  onSuccess?: (jwt: string) => void
  autoFocus?: boolean
}
export default function RegisterForm({ formRef, onSuccess, autoFocus = true }: RegisterFormProps) {
  const router = useRouter()
  const classes = useStyles()
  const [registerHandler] = useRegisterMutation({ context: { skipAuthorization: true } })
  const { FormError, setError, resetError } = useFormError()
  const { handleSubmit, errors } = useFormContext<RegisterFormData>()

  useEffect(() => {
    if (errors.acceptedTerms) {
      setError('error_terms_conditions', 'warning')
    } else {
      resetError()
    }
  }, [errors.acceptedTerms])

  const onSubmit = handleSubmit(async (values, event) => {
    event?.preventDefault()
    resetError()
    try {
      const { data } = await registerHandler({
        variables: {
          payload: {
            email: values.email,
            password: values.password,
            name: values.email.substring(0, values.email.indexOf('@')),
          },
        },
      })
      if (data?.register?.jwtToken) {
        setJwtCookie(data.register.jwtToken)
        if (onSuccess) {
          onSuccess(data.register.jwtToken)
        } else {
          redirectToPathname((router.query.redirect as string) || routes.welcome)
        }
      }
    } catch (error) {
      const message = _.get(error, 'graphQLErrors[0].message')
      switch (message) {
        case 'email_not_provided':
          setError('required_email')
          break
        case 'user_already_exists':
          setError('error_already_registered')
          break
        default:
          setError(message)
          break
      }
    }
  })

  return (
    <form noValidate method="POST" ref={formRef} onSubmit={onSubmit} className={classes.formBase}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <EmailController autoFocus={autoFocus} />
        </Grid>
        <Grid item>
          <PasswordController />
        </Grid>
        <Grid item>
          <PasswordController name="confirmPassword" label="confirm_password" />
        </Grid>
        <Grid item>
          <ConsentCheckbox />
          <NewsletterCheckbox />
        </Grid>
        <Grid item>
          <FormError />
          {/* {!_.isEmpty(errors) && <pre>{JSON.stringify(errors, null, 2)}</pre>} */}
        </Grid>
        <HiddenSubmitButton />
      </Grid>
    </form>
  )
}
