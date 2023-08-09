import React from 'react'
import { Container, LinearProgress, Box } from '@material-ui/core'

import Link from 'components/common/Link'
import routes from 'common/routes'
import ParkhandsIcon from 'components/common/ParkhandsIcon'

export default () => (
  <Container maxWidth="sm">
    <Box mx="auto" my={5} display="flex" justifyContent="center">
      <Link href={routes.login}>
        <ParkhandsIcon fontSize="large" />
      </Link>
    </Box>
    <LinearProgress color="secondary" />
  </Container>
)
