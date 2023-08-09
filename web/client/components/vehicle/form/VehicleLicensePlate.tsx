import _ from 'lodash'
import React, { useState, useMemo, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MenuItem, Typography, TextField, TextFieldProps } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'
import { useMyVehiclesListQuery } from 'gql/schema'
import { useUser } from 'components/hooks/useUser'

import VehicleDialog from './VehicleDialog'

export default function VehicleLicensePlate({ label = 'License Plate', ...props }: TextFieldProps) {
  const { t } = useTranslation(Domain.Forms)
  const { userId } = useUser()
  const { data: vehicles, refetch } = useMyVehiclesListQuery({
    variables: { ownerId: userId },
    fetchPolicy: 'cache-and-network',
  })
  const [open, setOpen] = useState(false)
  const { watch, setValue } = useFormContext()
  const translatedLabel = useMemo(() => {
    if (typeof label === 'string') {
      return t(label)
    }
    return label
  }, [label])

  useEffect(() => {
    if (!props.name) {
      return
    }
    if (vehicles && vehicles.vehiclesList && vehicles.vehiclesList.length > 0) {
      const selected = watch(props.name)
      if (!selected) {
        setValue(props.name, vehicles.vehiclesList[0].licensePlate)
      }
    }
  }, [watch, vehicles?.vehiclesList])

  return (
    <>
      <TextField
        select
        fullWidth
        variant="outlined"
        margin="dense"
        label={translatedLabel}
        {...props}>
        <MenuItem value="" disabled>
          <Typography variant="subtitle2">
            <em>{translatedLabel}</em>
          </Typography>
        </MenuItem>
        {_.map(vehicles?.vehiclesList, (vehicle) => {
          if (!vehicle?.licensePlate) {
            return null
          }
          return (
            <MenuItem key={vehicle.id} value={vehicle.licensePlate}>
              <Typography align="left">{vehicle.licensePlate}</Typography>
            </MenuItem>
          )
        })}
        <MenuItem value="" onClick={() => setOpen(true)}>
          {t('add_new_vehicle')}
        </MenuItem>
      </TextField>
      <VehicleDialog
        open={open}
        onCreate={async (licensePlate) => {
          await refetch()
          if (props.name) {
            setValue(props.name, licensePlate)
          }
          setOpen(false)
        }}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
