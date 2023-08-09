import _ from 'lodash'
import React, { useState } from 'react'
import { Check, Close } from '@material-ui/icons'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { useForm, FormContext, DeepPartial } from 'react-hook-form'
import { Grid, Snackbar, IconButton, CircularProgress, Box } from '@material-ui/core'

import FormAlert from 'components/alert/FormAlert'
import useFormError from 'components/hooks/useFormError'
import HiddenIdController from 'components/form/controller/HiddenIdController'
import NameController from 'components/form/controller/NameController'
import {
  PickArrayType,
  useCreateParkingSpaceMutation,
  useUpdateParkingSpaceMutation,
  useDeleteParkingSpaceMutation,
  MyParkingSpacesListQuery,
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
type ParkingSpace = PickArrayType<MyParkingSpacesListQuery['parkingSpacesList']>
export type ParkingSpaceFormProps = {
  parkingSpace?: DeepPartial<ParkingSpace>
  onCreate?: (licensePlate?: string) => void
  onDelete?: () => void
  onFormSuccess?: () => void
  disableDeletion?: boolean
}
const parkingSpaceDefaultValue = {
  name: '',
}

export default function ParkingSpaceForm({
  parkingSpace = parkingSpaceDefaultValue,
  onFormSuccess,
  onCreate,
  onDelete,
  disableDeletion = false,
}: ParkingSpaceFormProps) {
  const classes = useStyles()
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const { FormError, setError, resetError } = useFormError()
  const [createParkingSpace, { loading: createLoading }] = useCreateParkingSpaceMutation()
  const [updateParkingSpace, { loading: updateLoading }] = useUpdateParkingSpaceMutation()
  const [deleteParkingSpace, { loading: deleteLoading }] = useDeleteParkingSpaceMutation()
  const isUpdate = !!parkingSpace?.id
  const loading = createLoading || updateLoading
  const methods = useForm<ParkingSpace>({
    mode: 'onChange',
    defaultValues: parkingSpace,
    validationSchema: isUpdate ? schemaUpdate : schemaCreate,
  })
  const { handleSubmit, errors } = methods
  const closeAlertHandler = () => setShowAlert(false)

  const deleteHandler = async () => {
    if (parkingSpace?.id) {
      try {
        await deleteParkingSpace({ variables: { id: parkingSpace.id } })
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
    event?.stopPropagation()
    event?.preventDefault()
    resetError()
    try {
      if (values.id) {
        await updateParkingSpace({
          variables: {
            id: values.id,
            patch: {
              name: values.name,
            },
          },
        })
      } else {
        const { data } = await createParkingSpace({
          variables: {
            input: {
              parkingSpace: {
                name: values.name,
              },
            },
          },
        })
        if (typeof onCreate === 'function') {
          onCreate(data?.createParkingSpace?.parkingSpace?.id)
        }
      }
      if (typeof onFormSuccess === 'function') {
        onFormSuccess()
      }
    } catch (error) {
      console.error(error)
      setError(_.get(error, 'graphQLErrors[0].detail', _.get(error, 'graphQLErrors[0].message')))
    }
  })

  return (
    <FormContext {...methods}>
      <form onSubmit={onSubmitHandler} method="POST" encType="multipart/form-data">
        <Grid container direction="column" justify="space-evenly">
          <HiddenIdController />
          <Grid item xs={12}>
            <NameController disabled={loading} margin="dense" autoFocus />
          </Grid>
          <Grid item xs={12}>
            <Box width="100%" textAlign="center" pt={1}>
              <IconButton
                type="submit"
                className={classes.saveIcon}
                color={isUpdate ? 'default' : 'secondary'}>
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
          <Grid item xs={12}>
            <FormError />
          </Grid>
        </Grid>
        <Snackbar open={showAlert} autoHideDuration={2000} onClose={closeAlertHandler}>
          <FormAlert
            show={showAlert}
            alertProps={{ severity: 'success', onClose: closeAlertHandler }}>
            {isUpdate ? 'parking_space_updated' : 'parking_space_created'}
          </FormAlert>
        </Snackbar>
      </form>
    </FormContext>
  )
}
