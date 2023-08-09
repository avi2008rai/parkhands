import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Paper, Typography, Grid, Box } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'
import routes from 'common/routes'
import Layout from 'components/layout/Layout'
import { useUser } from 'components/hooks/useUser'

import Form from './Form'
import useStyles from '../styles'

function CreateVehiclePage() {
  const router = useRouter()
  const classes = useStyles()
  const { t } = useTranslation(Domain.Pages)
  const { userId } = useUser()

  const onCreated = () => {
    const { href, as } = routes.vehicles.index
    router.push(href, as)
  }
  return (
    <div>
      <Typography variant="h2" paragraph>
        {t('create_vehicle')}
      </Typography>
      <Grid container alignItems="flex-start">
        <Grid item lg={8} xs={12}>
          <Paper className={classes.paper}>
            <Box p={3} className={classes.leftColumn}>
              <Form ownerId={userId} onCreated={onCreated} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default () => (
  <Layout title="Vehicles">
    <CreateVehiclePage />
  </Layout>
)
