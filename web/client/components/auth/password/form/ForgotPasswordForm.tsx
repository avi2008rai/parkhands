import _ from 'lodash'
import * as Yup from 'yup'
import React from 'react'
import { Grid } from '@material-ui/core'
import { UseFormOptions, useFormContext } from 'react-hook-form'

import { useDomain, Domain } from 'common/i18n'
import { useForgotPasswordMutation } from 'gql/schema'
import useFormError from 'components/hooks/useFormError'
import EmailController from 'components/form/controller/EmailController'
import HiddenSubmitButton from 'components/common/form/HiddenSubmitButton'

const t = useDomain(Domain.Validation)
const schema = Yup.object().shape({
  email: Yup.string().email('invalid_email').required(t('required_email')),
})

export const formOptions: UseFormOptions<ForgotPasswordFormData> = {
  mode: 'onChange',
  validationSchema: schema,
  defaultValues: { email: '' },
}

type ForgotPasswordFormData = {
  email: string
}

type ForgotPasswordFormProps = {
  formRef: React.Ref<HTMLFormElement>
  onPasswordLinkSent?: () => void
}

export default function ForgotPasswordForm({
  formRef,
  onPasswordLinkSent,
}: ForgotPasswordFormProps) {
  const { handleSubmit } = useFormContext<ForgotPasswordFormData>()
  const { FormError, setError, resetError } = useFormError()
  const [forgotPassword] = useForgotPasswordMutation({ context: { skipAuthorization: true } })

  const onSubmit = handleSubmit(async (payload, event) => {
    event?.preventDefault()
    resetError()
    try {
      const { data } = await forgotPassword({ variables: { payload } })
      const success = _.get(data, 'forgotPassword.boolean') as boolean
      if (success && typeof onPasswordLinkSent === 'function') {
        await onPasswordLinkSent()
      }
    } catch (error) {
      setError(_.get(error, 'graphQLErrors[0].message'))
    }
  })

  return (
    <form ref={formRef} onSubmit={onSubmit} method="POST" encType="multipart/form-data">
      <Grid container direction="column" justify="center" alignItems="stretch">
        <Grid item>
          <EmailController fullWidth />
        </Grid>
        <Grid item>
          <FormError />
        </Grid>
        <HiddenSubmitButton />
      </Grid>
    </form>
  )
}
