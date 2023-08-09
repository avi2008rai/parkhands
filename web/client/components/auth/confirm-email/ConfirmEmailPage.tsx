import _ from 'lodash'
import React, { useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'

import routes from 'common/routes'
import { StatusT } from 'gql/schema'
import { Domain, useDomain } from 'common/i18n'
import { useUser } from 'components/hooks/useUser'
import useFormError from 'components/hooks/useFormError'
import ActionDialog from 'components/common/ActionDialog'
import CheckmarkIcon from 'components/common/icon/CheckmarkIcon'
import DialogSubmitButton from 'components/common/form/DialogSubmitButton'

import useStyles from '../authStyles'

export default function ConfirmEmailPage() {
  const classes = useStyles()
  const t = useDomain(Domain.Pages)
  const { updateProfile, refreshUser } = useUser()
  const { FormError, setError } = useFormError()

  const confirmEmail = async () => {
    try {
      await updateProfile({
        status: StatusT.Enabled,
        emailConfirmed: true,
      })
      await refreshUser()
    } catch (error) {
      console.error(error)
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
            setError('invalid_activation_token')
            break
        }
      }
    }
  }

  useEffect(() => {
    confirmEmail()
  }, [])

  return (
    <ActionDialog flex maxWidth="xs" closeToDashboard>
      <Box flexGrow={6} px={3} mt={3} py={5}>
        <Typography variant="h3">{t('welcome_to_parkhands')}</Typography>
      </Box>
      <Box flexGrow={6} px={3} mb={5}>
        <div style={{ minHeight: '20vh' }}>
          <CheckmarkIcon className={classes.checkmark} color="secondary" />
        </div>
      </Box>
      <Box flexGrow={6} px={3} pb={3}>
        <FormError />
      </Box>
      <DialogSubmitButton color="secondary" label="continue" href={routes.dashboard} />
    </ActionDialog>
  )
}
