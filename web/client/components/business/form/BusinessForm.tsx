import _ from 'lodash'
import React, { useState } from 'react'
import { Point } from 'geojson'
import { Check, Close } from '@material-ui/icons'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { useForm, FormContext, DeepPartial } from 'react-hook-form'
import { Grid, Snackbar, IconButton, CircularProgress, Box } from '@material-ui/core'

import FormAlert from 'components/alert/FormAlert'
import useFormError from 'components/hooks/useFormError'
import HiddenIdController from 'components/form/controller/HiddenIdController'
import {
  PickArrayType,
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
  useDeleteBusinessMutation,
  MyBusinessListQuery,
} from 'gql/schema'

import { schemaCreate, schemaUpdate } from './validation'
import NameController from 'components/form/controller/NameController'
import TextFieldController from 'components/form/controller/TextFieldController'

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
type Business = PickArrayType<MyBusinessListQuery['businessesList']> & {
  latitude: number
  longitude: number
}
type BusinessFormProps = {
  direction?: 'row' | 'column'
  business?: DeepPartial<Business>
  onCreate?: (licensePlate?: string) => void
  onDelete?: () => void
  onFormSuccess?: () => void
  disableDeletion?: boolean
}

function normalizeBusiness({
  business,
}: Pick<BusinessFormProps, 'business'>): DeepPartial<Business> {
  if (!business) {
    return {
      name: '',
      description: '',
      photoUrl: '',
      markerUrl: '',
      latitude: 52.264537,
      longitude: 10.542015,
    }
  }
  return {
    ...business,
    photoUrl: business.photoUrl || '',
    markerUrl: business.markerUrl || '',
    latitude: business?.location?.latitude,
    longitude: business?.location?.longitude,
  }
}

export default function BusinessForm({
  direction = 'row',
  business,
  onFormSuccess,
  onCreate,
  onDelete,
  disableDeletion = false,
}: BusinessFormProps) {
  const classes = useStyles()
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const { FormError, setError, resetError } = useFormError()
  const [createBusiness, { loading: createLoading }] = useCreateBusinessMutation()
  const [updateBusiness, { loading: updateLoading }] = useUpdateBusinessMutation()
  const [deleteBusiness, { loading: deleteLoading }] = useDeleteBusinessMutation()
  const isUpdate = !!business?.id
  const loading = createLoading || updateLoading
  const methods = useForm<Business>({
    mode: 'onChange',
    defaultValues: normalizeBusiness({ business }),
    validationSchema: isUpdate ? schemaUpdate : schemaCreate,
  })
  const { handleSubmit } = methods
  const closeAlertHandler = () => setShowAlert(false)

  const deleteHandler = async () => {
    if (business?.id) {
      try {
        await deleteBusiness({ variables: { id: business.id } })
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
      const location: Point = {
        type: 'Point',
        coordinates: [values.longitude, values.latitude],
      }
      if (values.id) {
        await updateBusiness({
          variables: {
            id: values.id,
            patch: {
              name: values.name,
              description: values.description,
              photoUrl: values.photoUrl,
              markerUrl: values.markerUrl,
              location,
            },
          },
        })
      } else {
        await createBusiness({
          variables: {
            payload: {
              business: {
                name: values.name,
                description: values.description,
                photoUrl: values.photoUrl,
                markerUrl: values.markerUrl,
                location,
              },
            },
          },
        })
        if (typeof onCreate === 'function') {
          await onCreate()
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
  return (
    <FormContext {...methods}>
      <form onSubmit={onSubmitHandler} method="POST" encType="multipart/form-data">
        <Grid container direction={direction} justify="space-evenly">
          <HiddenIdController />
          <Grid item>
            <NameController disabled={loading} margin="dense" />
          </Grid>
          <Grid item>
            <TextFieldController
              name="description"
              label="Address"
              disabled={loading}
              margin="dense"
            />
          </Grid>
          <Grid item>
            <TextFieldController
              name="photoUrl"
              label="Logo URL"
              disabled={loading}
              margin="dense"
            />
          </Grid>
          <Grid item>
            <Grid container direction="row" justify="space-evenly">
              <Grid item xs={6}>
                <TextFieldController
                  fullWidth
                  type="number"
                  margin="dense"
                  name="longitude"
                  label="Longitude"
                  disabled={loading}
                  inputProps={{ step: 0.001 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldController
                  fullWidth
                  type="number"
                  margin="dense"
                  name="latitude"
                  label="Latitude"
                  disabled={loading}
                  inputProps={{ step: 0.001 }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
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
                <IconButton
                  disabled={deleteLoading}
                  onClick={deleteHandler}
                  className={classes.deleteIcon}>
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
            {isUpdate ? 'Business location updated!' : 'Business location created!'}
          </FormAlert>
        </Snackbar>
      </form>
    </FormContext>
  )
}
