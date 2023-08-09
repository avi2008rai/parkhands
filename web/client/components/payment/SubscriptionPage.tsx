import _ from 'lodash'
import getConfig from 'next/config'
import React, { useState, useEffect } from 'react'
import { Typography, Grid, Grow } from '@material-ui/core'

import routes from 'common/routes'
import { Page } from 'common/utils/appParams'
import { useDomain, Domain } from 'common/i18n'
import { useUser } from 'components/hooks/useUser'
import FormAlert from 'components/alert/FormAlert'
import { PlanPriceResponse } from 'lib/api/responses'
import LinkButton from 'components/common/LinkButton'
import PageDialog from 'components/common/PageDialog'
import ParkhandsIcon from 'components/common/ParkhandsIcon'

import SubscriptionForm from './form/SubscriptionForm'

const {
  publicRuntimeConfig: { CLIENT_URL },
} = getConfig()

export type QueryParams = {}
export type PageParams = Page<QueryParams, { plan: PlanPriceResponse }>

export const fetcher = async () => {
  try {
    const response = await fetch(`${CLIENT_URL}/api/plan-price`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error({ error })
  }
  return null
}

export default function SubscriptionPage() {
  const { role, can, refreshUser } = useUser()
  const t = useDomain(Domain.Pages)
  const [newSubscription, setNewSubscription] = useState(false)

  useEffect(() => {
    refreshUser()
    return () => refreshUser()
  }, [])

  return (
    <PageDialog closeToDashboard maxWidth="sm">
      <Grow
        in={can.subscribe && !newSubscription}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 500, exit: 0 }}>
        <Grid container direction="column">
          <Grid item>
            <ParkhandsIcon fontSize="large" />
          </Grid>
          <Grid item>
            <Typography variant="h3" paragraph>
              {t('parkhands_premium_subscription')}
            </Typography>
          </Grid>
          <Grid item>
            <SubscriptionForm
              onSubscriptionSuccess={() => {
                setTimeout(() => refreshUser(), 5000)
                setNewSubscription(true)
              }}
            />
          </Grid>
        </Grid>
      </Grow>
      <Grow
        in={role.isProviderPremium || role.isSuperAdmin || newSubscription}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 500, exit: 0 }}>
        <Grid container direction="column" spacing={5}>
          <Grid item>
            <ParkhandsIcon fontSize="large" />
          </Grid>
          <Grid item>
            <Typography variant="h3" paragraph>
              {t('title_welcome_to_parkhands_premium')}
            </Typography>
          </Grid>
          <Grid item>
            <FormAlert show={role.isSuperAdmin}>
              {t('no_subscriptions_available_superadmin')}
            </FormAlert>
            <FormAlert show={role.isProviderPremium}>{t('your_subscription_is_active')}</FormAlert>
            <FormAlert show={newSubscription && role.isProvider}>
              {t('alert_subscription_updated')}
            </FormAlert>
          </Grid>
          {role.isProviderPremium && (
            <Grid item>
              <LinkButton href={routes.dashboard} color="primary" variant="contained">
                {t('go_dashboard')}
              </LinkButton>
            </Grid>
          )}
        </Grid>
      </Grow>
    </PageDialog>
  )
}
