import { useRouter } from 'next/router'
import { Box, Button, Typography } from '@material-ui/core'

import routes from 'common/routes'
import Link from 'components/common/Link'
import { Domain, useDomain } from 'common/i18n'

export type RegisterLinksProps = {
  loginOnClick?: () => void
  dense?: boolean
}
export default function RegisterLinks({ loginOnClick, dense = false }: RegisterLinksProps) {
  const t = useDomain(Domain.Pages)
  const LoginText = () => (
    <Typography display="inline" color="secondary" variant="subtitle2">
      {t('Login')}
    </Typography>
  )
  return (
    <Box py={dense ? 2 : 5} textAlign="center">
      {loginOnClick ? (
        <Button color="secondary" size="small" onClick={loginOnClick}>
          <LoginText />
        </Button>
      ) : (
        <Link href={routes.login}>
          <LoginText />
        </Link>
      )}
    </Box>
  )
}
