import React from 'react'
import { Divider, Box } from '@material-ui/core'

import Breadcrumbs from './Breadcrumbs'

export default function Header() {
  return (
    <Box m={2}>
      <Breadcrumbs />
      <Divider />
    </Box>
  )
}
