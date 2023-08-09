import _ from 'lodash'
import React from 'react'
import { MenuItem, Select, SelectProps, Typography } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'
import { useVehicleTypesListQuery } from 'gql/schema'
import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

export default function VehicleTypeController({
  label,
  labelId,
}: Pick<SelectProps, 'label' | 'labelId'>) {
  const { errors, control } = useFormContext()
  const { data: vehicleTypes } = useVehicleTypesListQuery({ fetchPolicy: 'cache-first' })
  const { t } = useTranslation(Domain.General)
  return (
    <Controller
      label={label}
      labelId={labelId}
      control={control}
      name="vehicleTypeId"
      error={Boolean(errors.vehicleTypeId)}
      onChange={([, /* skip arg event */ selected]) => selected.props.value}
      as={
        <Select fullWidth variant="outlined" margin="dense">
          <MenuItem value="" disabled>
            <Typography variant="subtitle2">
              <em>{t('select_vehicle', { ns: Domain.General })}</em>
            </Typography>
          </MenuItem>
          {_.map(vehicleTypes?.vehicleTypesList, (type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      }
    />
  )
}
