import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem, Typography, TextField, TextFieldProps } from '@material-ui/core'

import { useVehicleTypesListQuery } from 'gql/schema'
import { Domain } from 'common/i18n/locale'

export default function VehicleTypeSelect(props: TextFieldProps) {
  const { data: vehicleTypes } = useVehicleTypesListQuery({ fetchPolicy: 'cache-first' })
  const { t } = useTranslation(Domain.Forms)
  return (
    <TextField
      select
      fullWidth
      margin="dense"
      variant="outlined"
      label={t('vehicle_type')}
      {...props}>
      <MenuItem value="" disabled>
        <Typography variant="subtitle2">
          <em>{t('select_vehicle_type')}</em>
        </Typography>
      </MenuItem>
      {_.map(vehicleTypes?.vehicleTypesList, (type) => (
        <MenuItem key={type.id} value={type.id}>
          {t(type.name)}
        </MenuItem>
      ))}
    </TextField>
  )
}
