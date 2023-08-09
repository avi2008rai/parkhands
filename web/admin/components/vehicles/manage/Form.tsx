import _ from 'lodash'
import React from 'react'
import { useForm, FormContext } from 'react-hook-form'
import { FormControlLabel, FormControl, Box } from '@material-ui/core'
import { useRouter } from 'next/router'
import { Alert } from '@material-ui/lab'

import routes from 'common/routes'
import useFormError from 'components/common/hooks/useFormError'
import OwnerIdField from 'components/users/controller/OwnerIdField'
import NameController from 'components/common/form/controller/NameController'
import StatusController from 'components/common/form/controller/StatusController'
import HiddenIdController from 'components/common/form/controller/HiddenIdController'
import VehicleSizeField from 'components/vehicles/controller/field/VehicleSizeField'
import VehicleTypeField from 'components/vehicles/controller/field/VehicleTypeField'
import LicensePlateController from 'components/vehicles/controller/LicensePlateController'
import {
  ManageVehicleQuery,
  StatusT,
  UpdateVehicleInput,
  UpdateVehicleMutation,
  useDeleteVehicleMutation,
  useUpdateVehicleMutation,
} from 'gql/schema'

import useStyles from '../styles'
import { schemaUpdate as validationSchema } from '../validation'

type VehicleForm = {
  id: string
  name: string
  status: StatusT
  ownerId: string
  licensePlate: string
  vehicleTypeId: string
  vehicleSizeId: string
}

function vehicleToForm({ vehicle }: ManageVehicleQuery): VehicleForm {
  if (!vehicle) {
    throw 'No vehicle'
  }
  console.log({ vehicle })
  return {
    id: vehicle.id,
    name: vehicle.name,
    status: vehicle.status,
    ownerId: vehicle.ownerId,
    licensePlate: vehicle.licensePlate as string,
    vehicleTypeId: vehicle.vehicleTypeId,
    vehicleSizeId: vehicle.vehicleSizeId,
  }
}

type FormParams = {
  onUpdated?: (data?: UpdateVehicleMutation | null) => void
} & ManageVehicleQuery

export default function Form({ vehicle, onUpdated }: FormParams) {
  if (!vehicle) {
    return <Alert color="error">No vehicle data</Alert>
  }
  const defaultValues = vehicleToForm({ vehicle })
  const methods = useForm<VehicleForm>({
    defaultValues,
    validationSchema,
    mode: 'onBlur',
  })
  const { handleSubmit, reset, errors } = methods
  const { FormFooter, FormError, setError, resetError } = useFormError()

  const [submitVehicle, { loading }] = useUpdateVehicleMutation()

  const router = useRouter()
  const classes = useStyles()

  const [deleteVehicle] = useDeleteVehicleMutation()
  const onSubmit = handleSubmit(async (values: VehicleForm, e) => {
    e?.preventDefault()
    resetError()

    const variables: UpdateVehicleInput = {
      id: values.id,
      patch: {
        name: values.name,
        status: values.status,
        ownerId: values.ownerId,
        licensePlate: values.licensePlate,
        vehicleTypeId: values.vehicleTypeId,
      },
    }
    try {
      console.log({ variables })
      const { data } = await submitVehicle({ variables })
      console.log({ data })
      if (typeof onUpdated === 'function') {
        await onUpdated(data)
      }
    } catch (error) {
      console.error(error)
      setError(_.get(error, 'graphQLErrors[0].message'))
    }
  })

  return (
    <FormContext {...methods}>
      <form onSubmit={onSubmit} noValidate>
        <FormControl fullWidth className={classes.formControl} component="fieldset">
          <HiddenIdController />
          <Box display="flex" justifyContent="space-between">
            <FormControl fullWidth className={classes.formControl}>
              <OwnerIdField />
            </FormControl>
            <FormControl fullWidth className={classes.statusField}>
              <FormControlLabel control={<StatusController />} label="Active" />
            </FormControl>
          </Box>
          <FormControl className={classes.formControl}>
            <LicensePlateController />
          </FormControl>
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
          cancel
          cancelProps={{ ...routes.vehicles.index }}
          reset
          resetProps={{ onClick: () => reset(defaultValues) }}
          deleteButton
          deleteProps={{
            onConfirm: async () => {
              try {
                await deleteVehicle({ variables: { id: defaultValues.id } })
              } catch (error) {
                console.error(error)
              } finally {
                const { href, as } = routes.vehicles.index
                router.push(href, as)
              }
            },
          }}
        />
        {!_.isEmpty(errors) && <pre>{JSON.stringify(errors, null, 2)}</pre>}
      </form>
    </FormContext>
  )
}
