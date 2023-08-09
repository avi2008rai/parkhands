import _ from 'lodash'
import React from 'react'
import * as Yup from 'yup'
import { Grid } from '@material-ui/core'
import { useForm, FormContext } from 'react-hook-form'

import { useDomain, Domain } from 'common/i18n'
import { useUser } from 'components/hooks/useUser'
import { useActivateUserMutation } from 'gql/schema'
import useFormError from 'components/hooks/useFormError'
import SubmitButton from 'components/common/form/SubmitButton'
import TextFieldController from 'components/form/controller/TextFieldController'
import EmailController from 'components/form/controller/EmailController'

const t = useDomain(Domain.Validation)
const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .trim()
    .min(8, t('too_short'))
    .max(100, t('too_long'))
    .required(t('required_newpassword')),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword')], t('passwords_same')),
})

type ActivateUserFormData = {
  newPassword: string
  confirmPassword: string
}

type ChangePasswordFormProps = {
  jwtToken?: string
  onUserActivation?: () => void
  buttonLabel?: string
}

export default function ActivationForm({
  jwtToken,
  onUserActivation,
  buttonLabel = 'change_password',
}: ChangePasswordFormProps) {
  const { user, refreshUser } = useUser()
  const [activateUser, { loading }] = useActivateUserMutation()
  const { FormError, setError, resetError } = useFormError()

  const methods = useForm<ActivateUserFormData>({
    mode: 'onChange',
    validationSchema,
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })
  const { handleSubmit } = methods

  const onSubmit = handleSubmit(async (values, event) => {
    event?.preventDefault()
    resetError()

    try {
      const { data } = await activateUser({
        variables: {
          payload: {
            password: values.newPassword,
            password2: values.confirmPassword,
          },
        },
        context: {
          headers: { Authorization: `Bearer ${jwtToken}` },
        },
      })
      refreshUser()
      const responseToken = data?.activateUser?.jwtToken
      if (responseToken && typeof onUserActivation === 'function') {
        await onUserActivation()
      }
    } catch (error) {
      if (
        _.isEmpty(error.graphQLErrors) &&
        _.get(error, 'networkError.result.errors[0].message') === 'jwt malformed'
      ) {
        // jwt malformed error
        setError('invalid_activation_token')
      } else {
        const message = _.get(error, 'graphQLErrors[0].message')
        switch (message) {
          case 'user_not_found':
            setError('account_activation_token_not_found')
            break
          case 'user_already_activated':
            setError('account_already_activated')
            break
          case 'password_mismatch':
            setError('passwords_same')
            break
          default:
            setError(message)
            break
        }
      }
    }
  })

  return (
    <FormContext {...methods}>
      <form onSubmit={onSubmit} method="POST" encType="multipart/form-data">
        <Grid container direction="column" justify="center" alignItems="stretch">
          <Grid item>
            <EmailController inputProps={{ readOnly: true }} defaultValue={user.email} />
          </Grid>
          <Grid item>
            <TextFieldController label="new_password" name="newPassword" type="password" />
          </Grid>
          <Grid item>
            <TextFieldController label="confirm_password" name="confirmPassword" type="password" />
          </Grid>
          <FormError />
          <Grid item>
            <SubmitButton label={buttonLabel} fullWidth loading={loading} />
          </Grid>
        </Grid>
      </form>
    </FormContext>
  )
}
