import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem, Typography, TextField, TextFieldProps } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'
import { useVehicleSizesListQuery } from 'gql/schema'

export default function VehicleSizeSelect({ label = 'vehicle_size', ...props }: TextFieldProps) {
  const { data: sizesData } = useVehicleSizesListQuery({
    fetchPolicy: 'cache-first',
  })
  const { t } = useTranslation(Domain.Forms)

  return (
    <TextField
      select
      fullWidth
      variant="outlined"
      margin="dense"
      label={typeof label === 'string' ? t(label) : label}
      {...props}>
      <MenuItem value="" disabled>
        <Typography variant="subtitle2">
          <em>{t(label ? `select_${label}` : 'select_vehicle_size')}</em>
        </Typography>
      </MenuItem>
      {_.map(
        sizesData?.vehicleSizesList,
        (size) =>
          size.name && (
            <MenuItem key={size.id} value={size.id}>
              {t(size.name)}
            </MenuItem>
          ),
      )}
    </TextField>
  )
}
