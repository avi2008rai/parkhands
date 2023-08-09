import _ from 'lodash'
import React from 'react'
import { useForm, FormContext } from 'react-hook-form'
import { FormControlLabel, FormControl, Box } from '@material-ui/core'

import useFormError from 'components/common/hooks/useFormError'
import OwnerIdField from 'components/users/controller/OwnerIdField'
import NameController from 'components/common/form/controller/NameController'
import StatusController from 'components/common/form/controller/StatusController'
import VehicleSizeField from 'components/vehicles/controller/field/VehicleSizeField'
import VehicleTypeField from 'components/vehicles/controller/field/VehicleTypeField'
import LicensePlateController from 'components/vehicles/controller/LicensePlateController'
import {
  CreateVehicleInput,
  CreateVehicleMutation,
  StatusT,
  useCreateVehicleMutation,
  VehicleInput,
} from 'gql/schema'

import useStyles from '../styles'
import { schemaCreate as validationSchema } from '../validation'

export type VehicleForm = {
  name: string
  status: StatusT
  ownerId?: string
  licensePlate: string
  vehicleTypeId: string
  vehicleSizeId: string
}

type FormParams = {
  onCreated?: (data?: CreateVehicleMutation | null) => void
} & Pick<VehicleInput, 'ownerId'>

export default function Form({ ownerId, onCreated }: FormParams) {
  const defaultValues: VehicleForm = {
    name: '',
    status: StatusT.Enabled,
    licensePlate: '',
    vehicleTypeId: '',
    vehicleSizeId: '',
  }
  const methods = useForm<VehicleForm>({
    defaultValues,
    validationSchema,
    mode: 'onBlur',
  })
  const { handleSubmit, reset, errors } = methods
  const { FormFooter, FormError, setError, resetError } = useFormError()

  const [submitVehicle, { loading }] = useCreateVehicleMutation()
  const classes = useStyles()

  const onSubmit = handleSubmit(async (values: VehicleForm, e) => {
    e?.preventDefault()
    resetError()

    const payload: CreateVehicleInput = {
      vehicle: {
        name: values.name,
        status: values.status,
        licensePlate: values.licensePlate,
        vehicleTypeId: values.vehicleTypeId,
        vehicleSizeId: values.vehicleSizeId,
        ownerId: values.ownerId,
      },
    }
    try {
      const { data } = await submitVehicle({ variables: { payload } })
      console.log({ data })
      if (typeof onCreated === 'function') {
        await onCreated(data)
      }
    } catch (error) {
      setError(_.get(error, 'graphQLErrors[0].message'))
    }
  })

  return (
    <FormContext {...methods}>
      <form onSubmit={onSubmit} noValidate>
        <FormControl fullWidth className={classes.formControl} component="fieldset">
          <OwnerIdField />
          <Box display="flex" justifyContent="space-between">
            <FormControl fullWidth className={classes.formControl}>
              <LicensePlateController />
            </FormControl>

            <FormControl fullWidth className={classes.statusField}>
              <FormControlLabel control={<StatusController />} label="Active" />
            </FormControl>
          </Box>

          <FormControl className={classes.formControl}>
            <NameController label="Name" />
          </FormControl>
          <FormControl className={classes.formControl}>
            <VehicleTypeField />
          </FormControl>
          <VehicleSizeField className={classes.formControl} />
        </FormControl>
        <FormError />
        <FormFooter
          submit
          submitProps={{ loading }}
          reset
          resetProps={{ onClick: () => reset(defaultValues) }}
        />
        {/* {!_.isEmpty(errors) && <pre>{JSON.stringify(errors, null, 2)}</pre>} */}
      </form>
    </FormContext>
  )
}
