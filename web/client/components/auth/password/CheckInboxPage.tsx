import React from 'react'
import { Typography, Box, Grid } from '@material-ui/core'

import routes from 'common/routes'
import { useDomain, Domain } from 'common/i18n'
import ActionDialog from 'components/common/ActionDialog'
import DialogSubmitButton from 'components/common/form/DialogSubmitButton'

export default function CheckInboxPage() {
  const t = useDomain(Domain.Pages)
  return (
    <ActionDialog flex headerLabel="check_your_inbox" closeToDashboard maxWidth="sm">
      <Box flexGrow={12} px={3} mt={3} py={5} display="flex" justifyContent="center">
        <Grid container direction="column" justify="center" alignItems="stretch">
          <Grid item>
            <Typography paragraph>{t('message_reset_password_link')}</Typography>
          </Grid>
          <Grid item>
            <Typography paragraph>{t('message_follow_instructions')}</Typography>
          </Grid>
        </Grid>
      </Box>
      <DialogSubmitButton href={routes.login} label="Login" color="secondary" />
    </ActionDialog>
  )
}
