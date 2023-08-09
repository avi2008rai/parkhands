import _ from 'lodash'
import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { MenuItem, Select, Typography, SelectProps } from '@material-ui/core'

import { VehicleSizesListQuery } from 'gql/schema'

export default function VehicleSizeController({
  label = 'Vehicle Size',
  labelId,
  vehicleSizesList,
}: Pick<SelectProps, 'label' | 'labelId'> & {
  vehicleSizesList: VehicleSizesListQuery['vehicleSizesList']
}) {
  const { errors, control } = useFormContext()

  return (
    <Controller
      label={label}
      labelId={labelId}
      name="vehicleSizeId"
      control={control}
      error={Boolean(errors.vehicleSizeId)}
      as={
        <Select fullWidth variant="outlined" margin="dense">
          <MenuItem value="" disabled>
            <Typography variant="subtitle2">
              <em>Select {label}</em>
            </Typography>
          </MenuItem>
          {_.map(vehicleSizesList, (size) => (
            <MenuItem key={size.id} value={size.id}>
              {size.name}
            </MenuItem>
          ))}
        </Select>
      }
    />
  )
}
