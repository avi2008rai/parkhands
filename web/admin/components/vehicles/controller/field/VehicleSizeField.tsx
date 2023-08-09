import _ from 'lodash'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  Box,
  CircularProgress,
  Fade,
  FormControl,
  FormHelperText,
  InputLabel,
} from '@material-ui/core'
import { useVehicleSizesListQuery } from 'gql/schema'

import VehicleSizeController from '../VehicleSizeController'

export default function VehicleSizeField({
  disabled = false,
  className = '',
  label = 'Vehicle Size',
}: {
  disabled?: boolean
  className?: string
  label?: string
}) {
  const { errors } = useFormContext()
  const { loading, data: sizesData } = useVehicleSizesListQuery({ fetchPolicy: 'cache-first' })

  if (loading || !sizesData) {
    return (
      <Fade in={true}>
        <Box mx="auto">
          <CircularProgress color="secondary" size={30} />
        </Box>
      </Fade>
    )
  }

  return (
    <FormControl fullWidth disabled={disabled} className={className}>
      <InputLabel margin="dense" id="slot-type-label" variant="outlined" required={true}>
        {label}
      </InputLabel>
      <VehicleSizeController
        label={label}
        labelId="slot-type-label"
        vehicleSizesList={sizesData.vehicleSizesList}
      />
      <FormHelperText variant="outlined" error={Boolean(errors.vehicleSizeId)}>
        {errors.vehicleSizeId?.message}
      </FormHelperText>
    </FormControl>
  )
}
