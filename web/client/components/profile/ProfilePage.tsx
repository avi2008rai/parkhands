import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Grid, Container } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'
import DotMenu from 'components/common/DotMenu'
import GdprBox from 'components/privacy/GdprBox'
import { useUser } from 'components/hooks/useUser'
import WidgetLink from 'components/profile/WidgetLink'
import VehicleList from 'components/vehicle/VehicleList'
import ProfileForm from 'components/profile/ProfileForm'
import PaymentMethodList from 'components/payment-method/PaymentMethodList'

import DeleteAccountButton from './menu/DeleteAccountButton'

export default function ProfilePage() {
  const { t } = useTranslation(Domain.Pages)
  const { role } = useUser()

  return (
    <Container maxWidth="lg">
      <Grid container justify="space-between">
        <Grid item xs={12} md={3}>
          <Grid container direction="column" spacing={5}>
            <Grid item>
              <Grid container direction="row" justify="space-between">
                <Grid item>
                  <Typography variant="h3" paragraph>
                    {t('profile')}
                  </Typography>
                </Grid>
                <Grid item>
                  <DotMenu>
                    <DeleteAccountButton />
                  </DotMenu>
                </Grid>
              </Grid>
              <ProfileForm />
            </Grid>
            {role.isProviderPremium && (
              <Grid item>
                <Typography variant="h4" paragraph>
                  {t('Parkhands Widgets')}
                </Typography>
                <Grid container direction="column">
                  <Grid item>
                    <WidgetLink />
                  </Grid>
                </Grid>
              </Grid>
            )}
            {/* @Disabled */}
            {/* <Grid item>
              <Typography variant="h4" paragraph>
                {t('parkhands_subscription')}
              </Typography>
              <Grid container direction="column">
                <Grid item>
                  <Link display="block" color="textPrimary" href={routes.bookings.index}>
                    {t('Bookings')}
                  </Link>
                  <Link display="block" color="textPrimary" href={routes.billing}>
                    {t('billing_detail')}
                  </Link>
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container direction="column" spacing={5}>
            <Grid item>
              <Typography variant="h3" paragraph>
                {t('vehicles')}
              </Typography>
              <VehicleList />
            </Grid>
            <Grid item>
              <Typography variant="h3" paragraph>
                {t('Payment Methods')}
              </Typography>
              <PaymentMethodList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <GdprBox />
      </Grid>
    </Container>
  )
}
