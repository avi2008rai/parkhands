import React from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Hidden, IconButton } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { AccountCircle, PowerSettingsNew } from '@material-ui/icons'

import { Domain } from 'common/i18n'
import routes from 'common/routes'
import { useUser } from 'components/hooks/useUser'
import LinkButton from 'components/common/LinkButton'
import LinkIconButton from 'components/common/LinkIconButton'
import LanguageSwitcher from 'components/layout/LanguageSwitcher'

const useStyles = makeStyles((theme) =>
  createStyles({
    avatar: {
      boxShadow: theme.shadows[4],
    },
    logoutBtn: {
      color: theme.palette.error.main,
      boxShadow: theme.shadows[4],
    },
  }),
)

export default function ProfileMenu() {
  const classes = useStyles()
  const { t } = useTranslation(Domain.Navigation)
  const { user, can } = useUser()
  return (
    <Grid container justify="flex-end" direction="row" wrap="nowrap" spacing={1}>
      <Hidden smDown>
        <Grid item>
          <LanguageSwitcher />
        </Grid>
      </Hidden>
      {can.subscribe && (
        <Hidden smDown>
          <Grid item>
            <LinkButton color="primary" variant="contained" href={routes.subscription}>
              {t('upgrade')}
            </LinkButton>
          </Grid>
        </Hidden>
      )}
      <Grid item>
        <LinkButton
          color="primary"
          style={{ whiteSpace: 'nowrap' }}
          variant="contained"
          {...routes.bookings.index}>
          {t('bookings')}
        </LinkButton>
      </Grid>
      {can.createSlots && (
        <Grid item>
          <LinkButton
            color="primary"
            style={{ whiteSpace: 'nowrap' }}
            variant="contained"
            {...routes.slots.index}>
            {t('parking_slots')}
          </LinkButton>
        </Grid>
      )}
      <Grid item>
        <LinkIconButton
          title={`${user.name}\n(${user.email})`}
          href={routes.profile}
          className={classes.avatar}>
          <AccountCircle />
        </LinkIconButton>
      </Grid>
      <Grid item>
        <a href={routes.logout}>
          {/* server-side redirect to logout page */}
          <IconButton
            edge="end"
            title={t('logout')}
            aria-label={t('logout')}
            className={classes.logoutBtn}>
            <PowerSettingsNew />
          </IconButton>
        </a>
      </Grid>
    </Grid>
  )
}
