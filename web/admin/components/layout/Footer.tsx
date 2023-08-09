import React from 'react'
import getConfig from 'next/config'
import { Link, Divider, Box, Typography } from '@material-ui/core'

import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

const {
  publicRuntimeConfig: { CLIENT_URL },
} = getConfig()

export default function Footer() {
  const { t } = useTranslation(Domain.Pages)

  return (
    <Box m={3} mt={5} component="footer">
      <Divider />
      <Box mt={2} display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="subtitle2">&copy; {t('copyright_yr', { ns: Domain.Pages })}</Typography>
        </Box>
        <Box display="flex">
          <Box mx={1}>
            <Link
              target="_blank"
              color="textPrimary"
              rel="noopener noreferrer"
              href={`${CLIENT_URL}/privacy`}>
              <Typography variant="subtitle2">{t('privacy_policy', { ns: Domain.Pages })}</Typography>
            </Link>
          </Box>
          <Box mx={1}>
            <Link
              target="_blank"
              color="textPrimary"
              rel="noopener noreferrer"
              href={`${CLIENT_URL}/terms`}>
              <Typography variant="subtitle2">{t('tc', { ns: Domain.Pages })}</Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
