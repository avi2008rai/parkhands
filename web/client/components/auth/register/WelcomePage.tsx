import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Typography } from '@material-ui/core'

import routes from 'common/routes'
import { Domain, useDomain } from 'common/i18n'
import useStyles from 'components/auth/authStyles'
import { useUser } from 'components/hooks/useUser'
import useFormError from 'components/hooks/useFormError'
import ActionDialog from 'components/common/ActionDialog'
import CheckmarkIcon from 'components/common/icon/CheckmarkIcon'
import DialogSubmitButton from 'components/common/form/DialogSubmitButton'
import { useResendActivationEmailMutation } from 'gql/schema'
import SubmitButton from 'components/common/form/SubmitButton'

export default function WelcomePage() {
  const router = useRouter()
  const classes = useStyles()
  const t = useDomain(Domain.Pages)
  const { FormError, setError, resetError } = useFormError()

  const {
    user: { email },
  } = useUser()
  const [resendActivation, { loading }] = useResendActivationEmailMutation({
    context: { skipAuthorization: true },
    variables: { email },
  })
  const sendAgainHandler = useCallback(async () => {
    resetError()
    try {
      await resendActivation()
    } catch (error) {
      switch (error.message) {
        case 'user_already_activated_or_unavailable':
          setError('warning_account_already_activated', 'warning')
          break

        default:
          break
      }
    }
  }, [resendActivation, resetError])

  const redirectToProfile = useCallback(() => {
    router.push(routes.profile)
  }, [router])

  return (
    <ActionDialog flex maxWidth="xs" closeModalButtonProps={{ style: { display: 'none' } }}>
      <Box flexGrow={6} px={3} mt={3} py={5}>
        <Typography variant="h3">{t('welcome_to_parkhands')}</Typography>
      </Box>
      <Box flexGrow={6} px={3} mb={5}>
        <div style={{ minHeight: '20vh' }}>
          <CheckmarkIcon className={classes.checkmark} color="secondary" />
        </div>
      </Box>
      <Box flexGrow={6} px={6} mb={5}>
        <Typography variant="body1" paragraph>
          {t('check_your_inbox_confirm_your_email_address')}
        </Typography>
        <SubmitButton
          variant="text"
          color="secondary"
          loadingColor="secondary"
          label={t('send_again')}
          loading={loading}
          onClick={sendAgainHandler}
        />
        <FormError />
      </Box>
      <DialogSubmitButton label="close" color="secondary" onClick={redirectToProfile} />
    </ActionDialog>
  )
}
