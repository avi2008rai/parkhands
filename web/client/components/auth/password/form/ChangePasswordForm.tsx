import _ from 'lodash'
import React from 'react'
import * as Yup from 'yup'
import { UseFormOptions, useFormContext } from 'react-hook-form'
import { Grid } from '@material-ui/core'

import { useDomain, Domain } from 'common/i18n'
import useFormError from 'components/hooks/useFormError'
import { useResetPasswordMutation, useLoginMutation } from 'gql/schema'
import TextFieldController from 'components/form/controller/TextFieldController'
import HiddenSubmitButton from 'components/common/form/HiddenSubmitButton'

const t = useDomain(Domain.Validation)

export const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .trim()
    .min(8, t('too_short'))
    .max(100, t('too_long'))
    .required(t('required_newpassword')),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword')], t('passwords_same')),
})
export const currentPasswordSchema = validationSchema.concat(
  Yup.object().shape({
    currentPassword: Yup.string()
      .trim()
      .min(8, t('too_short'))
      .max(100, t('too_long'))
      .required(t('required_current_password')),
  }),
)

type ResetPasswordFormData = {
  currentPassword?: string
  newPassword: string
  confirmPassword: string
}

export const formOptions: UseFormOptions<ResetPasswordFormData> = {
  mode: 'onChange',
  validationSchema,
  defaultValues: {
    newPassword: '',
    currentPassword: '',
    confirmPassword: '',
  },
}

type ChangePasswordFormProps = {
  formRef: React.Ref<HTMLFormElement>
  requireCurrentPassword: boolean
  email?: string
  jwtToken?: string
  onPasswordChanged?: () => void
  buttonLabel?: string
}

export default function ChangePasswordForm({
  formRef,
  requireCurrentPassword,
  email,
  jwtToken,
  onPasswordChanged,
}: ChangePasswordFormProps) {
  const [login] = useLoginMutation({ context: { skipAuthorization: true } })
  const [resetPassword] = useResetPasswordMutation()
  const { FormError, setError, resetError } = useFormError()

  const { handleSubmit } = useFormContext<ResetPasswordFormData>()

  const onSubmit = handleSubmit(async (values, event) => {
    event?.preventDefault()
    resetError()
    // Revalidate user current password by a login request
    if (requireCurrentPassword) {
      try {
        const loginResponse = await login({
          variables: {
            payload: { email, password: _.trim(values.currentPassword) },
          },
        })
        // Override jwtToken from login request
        if (loginResponse?.data?.login?.jwtToken) {
          jwtToken = loginResponse.data.login.jwtToken
        }
      } catch (error) {
        setError('error_wrong_password')
        return
      }
    }

    try {
      const { data } = await resetPassword({
        variables: { payload: { password: values.newPassword } },
        context: {
          // the reset password requires the token that is in the URL
          headers: { Authorization: `Bearer ${jwtToken}` },
        },
      })
      const success = _.get(data, 'resetPassword.boolean')
      if (success && typeof onPasswordChanged === 'function') {
        await onPasswordChanged()
      }
    } catch (error) {
      if (
        _.isEmpty(error.graphQLErrors) &&
        _.get(error, 'networkError.result.errors[0].message') === 'jwt malformed'
      ) {
        // jwt malformed error
        setError('error_invalid_reset_password')
      } else {
        switch (_.get(error, 'graphQLErrors[0].message')) {
          case 'user_is_disabled':
            setError('error_account_active')
            break

          default:
            setError(_.get(error, 'graphQLErrors[0].message'))
            break
        }
      }
    }
  })

  return (
    <form ref={formRef} onSubmit={onSubmit} method="POST" encType="multipart/form-data">
      <Grid container direction="column" justify="center" alignItems="stretch">
        {requireCurrentPassword && (
          <Grid item>
            <TextFieldController label="current_password" name="currentPassword" type="password" />
          </Grid>
        )}
        <Grid item>
          <TextFieldController label="new_password" name="newPassword" type="password" />
        </Grid>
        <Grid item>
          <TextFieldController label="confirm_password" name="confirmPassword" type="password" />
        </Grid>
        <Grid item>
          <FormError />
        </Grid>
        <HiddenSubmitButton />
      </Grid>
    </form>
  )
}
