import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import routes from 'common/routes'
import { useDomain, Domain } from 'common/i18n'
import { useUser } from 'components/hooks/useUser'
import LinkButton from 'components/common/LinkButton'
import LanguageSwitcher from 'components/layout/LanguageSwitcher'
import ProfileLogo from 'components/common/ProfileLogo'
import useStyles from 'components/auth/authStyles'

const privateNavMenuStyles = makeStyles((theme) => ({
  buttonDefault: {
    color: theme.palette.common.white,
  },
  buttonLogout: {
    color: theme.palette.error.main,
  },
}))

export default function PrivateNavMenu() {
  const classes = useStyles()
  const privateNavMenuClasses = privateNavMenuStyles()
  const { user, can } = useUser()
  const t = useDomain(Domain.Navigation)
  return (
    <Box display="flex" flexDirection="column" height="100%" px={2}>
      <Box
        width={1}
        flexGrow={1}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        mt={3}
        py={3}>
        <Box width={1} pb={5}>
          <div className={classes.logo}>
            <ProfileLogo />
          </div>
        </Box>
        <Box width={1} py={1}>
          <LinkButton
            className={privateNavMenuClasses.buttonDefault}
            fullWidth
            color="primary"
            variant="contained"
            href={routes.bookings.index.href}>
            {t('bookings')}
          </LinkButton>
        </Box>
        <Box width={1} py={1}>
          <LinkButton
            className={privateNavMenuClasses.buttonDefault}
            fullWidth
            color="primary"
            variant="contained"
            href={routes.profile}>
            {t('settings')}
          </LinkButton>
        </Box>
        {/* @Disabled */}
        {/* <Box width={1} py={1}>
          <LinkButton
            className={privateNavMenuClasses.buttonDefault}
            fullWidth
            color="primary"
            variant="contained"
            href={routes.slots.index.href}>
            {t('my_parking_slots')}
          </LinkButton>
        </Box> */}
        <Box width={1} textAlign="center">
          <LanguageSwitcher />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-end" px={2} py={4} mb={2}>
        <Box width={1} py={1}>
          <LinkButton className={privateNavMenuClasses.buttonLogout} fullWidth href={routes.logout}>
            {t('logout')}
          </LinkButton>
        </Box>
      </Box>
    </Box>
  )
}
