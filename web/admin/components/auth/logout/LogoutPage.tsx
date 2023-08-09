import React from 'react'
import { Container, LinearProgress, Box } from '@material-ui/core'

import AnonymousLayout from 'components/layout/AnonymousLayout'
import Link from 'components/common/Link'
import routes from 'common/routes'

export default function LogoutPage() {
  return (
    <AnonymousLayout title="Logout">
      <Container maxWidth="sm">
        <Box mx="auto" my={5} display="flex" justifyContent="center">
          <Link href={routes.login}>
            <img height={32} alt="Parkhands" src="/static/parkhands-icon.svg" />
          </Link>
        </Box>
        <LinearProgress color="secondary" />
      </Container>
    </AnonymousLayout>
  )
}
