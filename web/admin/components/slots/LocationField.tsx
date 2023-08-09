import React from 'react'
import { Box, Typography } from '@material-ui/core'

import LocationPicker from './LocationPicker'
import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

export default function LocationField() {
  const { t } = useTranslation(Domain.Slots)
  return (
    <Box p={2}>
      <LocationPicker useFormPosition />
    </Box>
  )
}
