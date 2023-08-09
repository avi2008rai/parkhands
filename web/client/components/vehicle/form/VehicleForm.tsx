import _ from 'lodash'
import React, { useState } from 'react'
import { Check, Close } from '@material-ui/icons'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { useForm, FormContext, DeepPartial } from 'react-hook-form'
import { Grid, Snackbar, IconButton, CircularProgress, Box } from '@material-ui/core'

import FormAlert from 'components/alert/FormAlert'
import useFormError from 'components/hooks/useFormError'
import HiddenIdController from 'components/form/controller/HiddenIdController'
import VehicleSizeController from 'components/vehicle/controller/VehicleSizeController'
import VehicleTypeController from 'components/vehicle/controller/VehicleTypeController'
import LicensePlateController from 'components/vehicle/controller/LicensePlateController'
import {
  PickArrayType,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  MyVehiclesListQuery,
  useDeleteVehicleMutation,
  StatusT,
} from 'gql/schema'

import { schemaCreate, schemaUpdate } from './validation'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    saveIcon: {
      boxShadow: theme.shadows[3],
    },
    deleteIcon: {
      boxShadow: theme.shadows[3],
      color: theme.palette.error.main,
      marginLeft: theme.spacing(1),
    },
  }),
)
type Vehicle = PickArrayType<MyVehiclesListQuery['vehiclesList']>
export type VehicleFormProps = {
  direction?: 'row' | 'column'
  vehicle?: DeepPartial<Vehicle>
  onCreate?: (licensePlate?: string) => void
  onDelete?: () => void
  onFormSuccess?: () => void
  disableDeletion?: boolean
}
const vehicleDefaultValue = {
  name: '',
  status: StatusT.Enabled,
  licensePlate: '',
  vehicleTypeId: '',
  vehicleSizeId: '',
}

export default function VehicleForm({
  direction = 'row',
  vehicle = vehicleDefaultValue,
  onFormSuccess,
  onCreate,
  onDelete,
  disableDeletion = false,
}: VehicleFormProps) {
  const classes = useStyles()
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const { FormError, setError, resetError } = useFormError()
  const [createVehicle, { loading: createLoading }] = useCreateVehicleMutation()
  const [updateVehicle, { loading: updateLoading }] = useUpdateVehicleMutation()
  const [deleteVehicle, { loading: deleteLoading }] = useDeleteVehicleMutation()
  const isUpdate = !!vehicle?.id
  const loading = createLoading || updateLoading
  const methods = useForm<Vehicle>({
    mode: 'onChange',
    defaultValues: vehicle,
    validationSchema: isUpdate ? schemaUpdate : schemaCreate,
  })
  const {
    handleSubmit,
    formState: { dirty },
  } = methods
  const closeAlertHandler = () => setShowAlert(false)

  const deleteHandler = async () => {
    if (vehicle?.id) {
      try {
        await deleteVehicle({ variables: { id: vehicle.id } })
        if (typeof onDelete === 'function') {
          await onDelete()
        }
      } catch (error) {
        setError(_.get(error, 'graphQLErrors[0].detail', _.get(error, 'graphQLErrors[0].message')))
        console.log(error)
      }
    }
  }

  const onSubmitHandler = handleSubmit(async (values, event) => {
    event?.preventDefault()
    resetError()
    try {
      if (values.id) {
        await updateVehicle({
          variables: {
            id: values.id,
            patch: {
              name: values.licensePlate || '',
              licensePlate: values.licensePlate,
              vehicleTypeId: values.vehicleTypeId,
              vehicleSizeId: values.vehicleSizeId,
            },
          },
        })
      } else {
        await createVehicle({
          variables: {
            payload: {
              vehicle: {
                name: values.licensePlate || '',
                licensePlate: values.licensePlate,
                vehicleTypeId: values.vehicleTypeId,
                vehicleSizeId: values.vehicleSizeId,
              },
            },
          },
        })
        if (typeof onCreate === 'function') {
          await onCreate(values.licensePlate || '')
        }
      }
      if (typeof onFormSuccess === 'function') {
        await onFormSuccess()
      }
    } catch (error) {
      console.error(error)
      setError(_.get(error, 'graphQLErrors[0].detail', _.get(error, 'graphQLErrors[0].message')))
    }
  })
  const sm = direction === 'row' ? 3 : 12
  return (
    <FormContext {...methods}>
      <form onSubmit={onSubmitHandler} method="POST" encType="multipart/form-data">
        <Grid container direction={direction} justify="space-evenly">
          <HiddenIdController />
          <Grid item xs={12} sm={sm}>
            <LicensePlateController disabled={loading} margin="dense" />
          </Grid>
          <Grid item xs={12} sm={sm}>
            <VehicleTypeController disabled={loading} />
          </Grid>
          <Grid item xs={direction === 'row' ? 8 : 12} sm={sm}>
            <VehicleSizeController disabled={loading} />
          </Grid>
          <Grid item xs={direction === 'row' ? 4 : 12} sm={sm}>
            <Box width="100%" textAlign="center" pt={1}>
              <IconButton
                type="submit"
                className={classes.saveIcon}
                color={!isUpdate || dirty ? 'secondary' : 'default'}>
                {loading ? (
                  <CircularProgress variant="indeterminate" color="secondary" size="1.5rem" />
                ) : (
                  <Check />
                )}
              </IconButton>
              {isUpdate && !disableDeletion && (
                <IconButton onClick={deleteHandler} className={classes.deleteIcon}>
                  {deleteLoading ? (
                    <CircularProgress variant="indeterminate" color="secondary" size="1.5rem" />
                  ) : (
                    <Close />
                  )}
                </IconButton>
              )}
            </Box>
          </Grid>
        </Grid>
        <FormError />
        <Snackbar open={showAlert} autoHideDuration={2000} onClose={closeAlertHandler}>
          <FormAlert
            show={showAlert}
            alertProps={{ severity: 'success', onClose: closeAlertHandler }}>
            {isUpdate ? 'Vehicle updated!' : 'Vehicle created!'}
          </FormAlert>
        </Snackbar>
      </form>
    </FormContext>
  )
}
