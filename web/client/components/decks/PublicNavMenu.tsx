import React from 'react'
import { Box } from '@material-ui/core'
import ProfileLogo from 'components/common/ProfileLogo'

import routes from 'common/routes'
import { useDomain, Domain } from 'common/i18n'
import LinkButton from 'components/common/LinkButton'
import LanguageSwitcher from 'components/layout/LanguageSwitcher'
import useStyles from 'components/auth/authStyles'

export default function PublicNavMenu() {
  const classes = useStyles()
  const t = useDomain(Domain.Navigation)
  return (
    <Box display="flex" flexDirection="column" height="100%" mt={3}>
      <Box flexGrow={1} display="flex" alignItems="flex-start" py={3}>
        <div className={classes.logo}>
          <ProfileLogo />
        </div>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-end" px={2} py={4} mb={2}>
        <Box width={1} py={1}>
          <LinkButton fullWidth color="primary" variant="contained" href={routes.login}>
            {t('login')}
          </LinkButton>
        </Box>
        <Box width={1} py={1}>
          <LinkButton fullWidth href={routes.register}>
            {t('signup')}
          </LinkButton>
        </Box>
        <Box width={1} textAlign="center">
          <LanguageSwitcher />
        </Box>
      </Box>
    </Box>
  )
}
