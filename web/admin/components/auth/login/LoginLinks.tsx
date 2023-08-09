import React from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Typography } from '@material-ui/core'

import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

import Link from 'components/common/Link'

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

  const { t } = useTranslation(Domain.Register)
  const createAnAccountText = (

    <Typography display="inline" color="secondary" variant="subtitle1">
      {t('please_register', { ns: Domain.Register })}

    </Typography>
  )
  const forgottenPasswordText = (
    <Typography display="inline" color="secondary" variant="subtitle1">
      {t('forget_pwd', { ns: Domain.Register })}
    </Typography>
  )

  return (
    <Box py={dense ? 2 : 5}>
      <Box pt={1} textAlign="center">
        <Typography display="inline" variant="subtitle1">
          {t('new_user', { ns: Domain.Register })}
        </Typography>{' '}
        {registerOnClick ? (
          <Button color="secondary" size="small" /*onClick={registerOnClick}*/>
            {createAnAccountText}
          </Button>
        ) : (
          <Link href="#">{createAnAccountText}</Link>
        )}
      </Box>
      <Box pt={1} textAlign="center">
        <Typography display="inline" variant="subtitle1">
        {t('did_you_forget_pwd', { ns: Domain.Register })}
        </Typography>{' '}
        {forgottenPasswordOnClick ? (
          <Button color="secondary" size="small" /*onClick={forgottenPasswordOnClick}*/>
            {forgottenPasswordText}
          </Button>
        ) : (
          <Link href="#">{forgottenPasswordText}</Link>
        )}
      </Box>
    </Box>
  )
}
