import React from 'react'
import { EmojiTransportation, DirectionsCar, Receipt } from '@material-ui/icons'
import { Box, Grid, Typography, Card, CardContent, CardActions } from '@material-ui/core'

import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

import routes from 'common/routes'
import Layout from 'components/layout/Layout'
import LinkButton from 'components/common/LinkButton'

function DashboardPage() {
  const { t } = useTranslation([Domain.General, Domain.Navigation])

  return (
    <Box p={4}>
      <Box mb={4}>
        <Typography variant="h1" paragraph>
          {t('welcome', { ns: Domain.General })}
        </Typography>
      </Box>
      <Typography variant="h3" paragraph>
        {t('dashboard', { ns: Domain.Navigation })}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography align="center">
                <EmojiTransportation fontSize="large" />
              </Typography>
              <Typography variant="h4" color="textPrimary" align="center">
                {t('manage_slots', { ns: Domain.General })}
              </Typography>
            </CardContent>
            <CardActions>
              <LinkButton
                fullWidth
                size="small"
                color="primary"
                variant="contained"
                {...routes.slots.index}>
                {t('visit', { ns: Domain.General })}
              </LinkButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography align="center">
                <DirectionsCar fontSize="large" />
              </Typography>
              <Typography variant="h4" color="textPrimary" align="center">
                {t('manage_vehicles', { ns: Domain.General })}
              </Typography>
            </CardContent>
            <CardActions>
              <LinkButton
                fullWidth
                size="small"
                color="primary"
                variant="contained"
                {...routes.vehicles.index}>
                {t('visit', { ns: Domain.General })}
              </LinkButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography align="center">
                <Receipt fontSize="large" />
              </Typography>
              <Typography variant="h4" color="textPrimary" align="center">
                {t('billing', { ns: Domain.Navigation })}
              </Typography>
            </CardContent>
            <CardActions>
              <LinkButton
                fullWidth
                size="small"
                color="primary"
                variant="contained"
                href={routes.billing}>
                {t('visit', { ns: Domain.General })}
              </LinkButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default () => (
  <Layout title="Dashboard">
    <DashboardPage />
  </Layout>
)
