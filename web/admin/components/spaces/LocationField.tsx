import React from 'react'
import { Box, Typography } from '@material-ui/core'

import LocationPicker from './LocationPicker'

export default function LocationField() {
  return (
    <Box p={2}>
      <LocationPicker useFormPosition />
    </Box>
  )
}
