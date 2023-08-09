import React from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Typography } from '@material-ui/core'

import routes from 'common/routes'
import Link from 'components/common/Link'
import { Domain, useDomain } from 'common/i18n'

export type LoginLinksProps = {
  registerOnClick?: () => void
  forgottenPasswordOnClick?: () => void
  dense?: boolean
}

export default function LoginLinks({
  registerOnClick,
  forgottenPasswordOnClick,
  dense = false,
}: LoginLinksProps) {
  const router = useRouter()
  const t = useDomain(Domain.Pages)
  const createAnAccountText = (
    <Typography display="inline" color="secondary" variant="subtitle2">
      {t('create_account')}
    </Typography>
  )
  const forgottenPasswordText = (
    <Typography display="inline" color="secondary" variant="subtitle2">
      {t('forget_password')}
    </Typography>
  )

  return (
    <Box py={dense ? 2 : 5}>
      <Box pt={1} textAlign="center">
        <Typography display="inline" variant="subtitle2">
          {t('new_to_parkhands')}
        </Typography>{' '}
        {registerOnClick ? (
          <Button color="secondary" size="small" onClick={registerOnClick}>
            {createAnAccountText}
          </Button>
        ) : (
          <Link href={{ pathname: routes.register, query: router.query }}>
            {createAnAccountText}
          </Link>
        )}
      </Box>
      <Box pt={1} textAlign="center">
        <Typography display="inline" variant="subtitle2">
          {t('did_you')}
        </Typography>{' '}
        {forgottenPasswordOnClick ? (
          <Button color="secondary" size="small" onClick={forgottenPasswordOnClick}>
            {forgottenPasswordText}
          </Button>
        ) : (
          <Link href={routes.forgotPassword}>{forgottenPasswordText}</Link>
        )}
      </Box>
    </Box>
  )
}
