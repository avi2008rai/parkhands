import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Paper, Typography, Grid, Box } from '@material-ui/core'

import { useDomain, Domain } from 'common/i18n'
import routes from 'common/routes'
import { AppParams } from 'common/utils/appParams'
import setJwtCookie from 'common/utils/setJwtCookie'
import ParkhandsLogo from 'components/common/ParkhandsLogo'
import ActivationForm from 'components/auth/activation/ActivationForm'

import useStyles from '../authStyles'

export default function ActivationPage({ jwtToken }: AppParams) {
  const router = useRouter()
  const classes = useStyles()
  const t = useDomain(Domain.Pages)

  useEffect(() => {
    // Store jwt cookie after user is logged in from activation token on SSR
    if (jwtToken) {
      setJwtCookie(jwtToken)
    }
  }, [])

  const onUserActivation = async () => {
    router.push(routes.dashboard)
  }

  return (
    <Paper>
      <Box m={1} p={5}>
        <div className={classes.logo}>
          <ParkhandsLogo variant="adaptive" />
        </div>
        <Grid container direction="column" justify="center" alignItems="stretch">
          <Grid item>
            <Typography variant="subtitle1">{t('confirm_email_address_set_password')}</Typography>
          </Grid>
          <Grid item>
            <ActivationForm
              jwtToken={jwtToken}
              buttonLabel="set_password"
              onUserActivation={onUserActivation}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}
