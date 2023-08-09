import React from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Paper, Box, Typography } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'
import Layout from 'components/layout/Layout'

import Form from './Form'

export type PageParams = {}

function CreateUserPage() {
  const { t } = useTranslation(Domain.Pages)
  return (
    <div>
      <Typography variant="h2" gutterBottom>
        {t('create_user',{ ns: Domain.Pages })}
      </Typography>
      <Grid container alignItems="flex-start" spacing={3}>
        <Grid item lg={8} xs={12}>
          <Paper>
            <Box p={3}>
              <Typography variant="subtitle1" gutterBottom>
                {t('profile', { ns: Domain.User })}
              </Typography>
              <Form />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default (params: PageParams) => (
  <Layout title="Users">
    <CreateUserPage {...params} />
  </Layout>
)
