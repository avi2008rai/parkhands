import React from 'react'
import { useRouter } from 'next/router'
import { Refresh, Mail } from '@material-ui/icons'
import { Button, Typography, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import routes from 'common/routes'
import { useDomain, Domain } from 'common/i18n'
import { useUser } from 'components/hooks/useUser'
import SnackbarAlert from 'components/alert/SnackbarAlert'
import { useUserContext } from 'components/hooks/useUserContext'
import { StatusT, useResendActivationEmailMutation } from 'gql/schema'

const useStyles = makeStyles((theme) =>
  createStyles({
    snackbar: {
      marginBottom: theme.spacing(7),
    },
    sendAgainBtn: {
      height: '100%',
      padding: theme.spacing(0, 2),
    },
  }),
)

export default function NotActivatedAlert() {
  const classes = useStyles()
  const t = useDomain(Domain.Pages)
  const router = useRouter()
  const {
    user: { email },
  } = useUser()
  const { currentUser } = useUserContext()
  const [resendActivation, { data }] = useResendActivationEmailMutation()
  const sendAgainHandler = () => {
    resendActivation({
      context: { skipAuthorization: true },
      variables: { email },
    })
  }

  // Hide alert if user is not logged in
  if (!currentUser) {
    return null
  }

  // Hide alert on activation page
  if (router.pathname === routes.activation) {
    return null
  }

  return (
    <SnackbarAlert
      show={currentUser.status.toUpperCase() === StatusT.Pending}
      snackbarProps={{
        className: classes.snackbar,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      }}
      alertProps={{
        severity: 'info',
      }}>
      <Grid container direction="row">
        <Grid item>
          <Typography variant="subtitle1">{t('your_account_still_pending')}</Typography>
          <Typography variant="subtitle2">
            {t('check_your_inbox_confirm_your_email_address')}
          </Typography>
        </Grid>
        <Grid item>
          {!data && (
            <Button
              fullWidth
              variant="text"
              color="inherit"
              startIcon={<Refresh />}
              className={classes.sendAgainBtn}
              onClick={sendAgainHandler}>
              {t('send_again')}
            </Button>
          )}
          {data?.resendActivationEmail && (
            <Button
              fullWidth
              variant="text"
              disableRipple
              disableFocusRipple
              color="inherit"
              startIcon={<Mail />}
              className={classes.sendAgainBtn}>
              {t('sent')}
            </Button>
          )}
        </Grid>
      </Grid>
    </SnackbarAlert>
  )
}
