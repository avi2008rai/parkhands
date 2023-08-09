import _ from 'lodash'
import React, { useMemo, useEffect } from 'react'
import { useForm, Controller, FormContext, DeepPartial } from 'react-hook-form'
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  Box,
  Typography,
  Grid,
  Button,
  Avatar,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import { Domain } from 'common/i18n/locale'
import { useTranslation } from 'react-i18next'
import { Polygon, Point } from 'geojson'
import routes from 'common/routes'
import useFormError from 'components/common/hooks/useFormError'
import NameController from 'components/common/form/controller/NameController'
import SpaceStatusController from 'components/common/form/controller/SpaceStatusController'
import HiddenIdController from 'components/common/form/controller/HiddenIdController'
import {
  crs,
  ManageSpaceQuery,
  ParkingSpaceStatus,
  useUpdateParkingSpaceMutation,
  useCreateParkingSpaceMutation,
  useDeleteParkingSpaceMutation,
  CreateParkingSpaceMutation,
  UpdateParkingSpaceMutation,
  SpaceCategory,
  SpaceAccessRestriction,
  Maybe,
} from 'gql/schema'

import useStyles from './styles'
import LocationField from './LocationField'
import { defaultPosition } from './LocationPicker'
import { schemaCreate, schemaUpdate } from './validation'
import SpaceAccessRestrictionsController from 'components/common/form/controller/SpaceAccessRestrictionsController'
import SpaceCategoryController from 'components/common/form/controller/SpaceCategoryController'

import { useUser } from 'components/hooks/useUser'
import PhotoUrlField from './PhotoUrlField'
import SpaceApproval from './SpaceApproval'
import DescriptionController from './controller/DescriptionController'
import ParkhandsLogo from 'components/layout/logo'
import Link from 'components/common/Link'
import StatusDescriptionController from './controller/StatusDescriptionController'
import { useDomain } from 'common/i18n'
import SetAvailabilityField, {
  prepareSpaceAvailability,
  initSpaceAvailability,
  AvailabilityRecord,
} from './availability/SetAvailabilityField'

type SpaceForm = {
  id?: string
  name: string
  description?: string | null
  photoUrl?: string | null
  ownerId?: string
  status?: ParkingSpaceStatus | null
  lat: number
  lng: number
  address?: { [key: string]: unknown } | null
  category?: string | null //{ [key: string]: string }
  accessRestriction?: Maybe<Array<Maybe<SpaceAccessRestriction>>>
  parkingspaceMapview: any
  businessStatusReason?: string | null
  availability: AvailabilityRecord[]
}

function normalizeSlot({
  parkingSpace,
  ownerId,
}: ManageSpaceQuery & { ownerId?: string }): DeepPartial<SpaceForm> {
  if (!parkingSpace) {
    return {
      name: '',
      photoUrl: '',
      description: '',
      ownerId: ownerId ?? '',
      status: ParkingSpaceStatus.Enabled,
      lat: defaultPosition.lat,
      lng: defaultPosition.lng,
      category: SpaceCategory.Public,
      accessRestriction: [SpaceAccessRestriction.None],
      businessStatusReason: '',
    }
  }

  return {
    id: parkingSpace.id,
    name: parkingSpace.name,
    photoUrl: parkingSpace.photoUrl || '',
    ownerId: parkingSpace.ownerId,
    lat: parkingSpace.location?.latitude,
    lng: parkingSpace.location?.longitude,
    address: parkingSpace.address,
    status: parkingSpace.status,
    description: parkingSpace.description,
    category: parkingSpace.category,
    accessRestriction: parkingSpace.accessRestriction,
    parkingspaceMapview: parkingSpace.parkingspaceMapview,
    businessStatusReason: parkingSpace.businessStatusReason,
    availability: initSpaceAvailability(parkingSpace.parkingSpaceAvailabilitiesList),
  }
}

type FormParams = {
  onFormSuccess?: (data?: UpdateParkingSpaceMutation | CreateParkingSpaceMutation | null) => void
  ownerId?: string
} & ManageSpaceQuery

export default function SpaceForm({ parkingSpace, onFormSuccess, ownerId }: FormParams) {
  const defaultValues = useMemo(() => normalizeSlot({ parkingSpace, ownerId }), [
    parkingSpace,
    ownerId,
  ])
  const validationSchema = useMemo(() => (parkingSpace ? schemaUpdate : schemaCreate), [
    parkingSpace,
  ])
  const methods = useForm<SpaceForm>({
    defaultValues,
    validationSchema,
    mode: 'onBlur',
  })

  const { handleSubmit, reset, control, register, unregister, watch, errors } = methods
  const { userId } = useUser()
  const { FormFooter, FormError, setError, resetError, error } = useFormError()

  const [createSpace, { loading: createLoading }] = useCreateParkingSpaceMutation()
  const [updateSpace, { loading: updateLoading }] = useUpdateParkingSpaceMutation()
  const loading = createLoading || updateLoading
  const { t } = useTranslation(Domain.Amenities)
  const t1 = useDomain(Domain.Spaces)
  const status = watch('status')

  const router = useRouter()
  const classes = useStyles()

  useEffect(() => {
    register('address')
    register('timezone')
    register('lat')
    register('lng')
    register('lng')
    register('parkingspaceMapview')
    register('carEntry')
    register('carExit')
    register('companyEntrance')

    return () => {
      unregister([
        'address',
        'timezone',
        'lat',
        'lng',
        'parkingspaceMapview',
        'carEntry',
        'carExit',
        'companyEntrance',
      ])
    }
  }, [])
  const [deleteSlot] = useDeleteParkingSpaceMutation()
  const onSubmit = handleSubmit(async (values: SpaceForm, e) => {
    e?.preventDefault()
    resetError()
    const location: Point = {
      type: 'Point',
      coordinates: [values.lng, values.lat],
      // @ts-ignore Geo CRS
      crs,
    }

    const patch = {
      name: values.name,
      address: values.address,
      status: values.status,
      photoUrl: values.photoUrl,
      description: values.description,
      ownerId: userId,
      location,
      accessRestriction: values.accessRestriction,
      parkingspaceMapview: values.parkingspaceMapview,
      businessStatusReason: values.businessStatusReason,
      parkingSpaceAvailabilitiesUsingId: prepareSpaceAvailability(values.availability),
    }
    try {
      let data
      if (parkingSpace) {
        data = (await updateSpace({ variables: { id: parkingSpace.id, patch } })).data
      } else {
        data = (await createSpace({ variables: { input: { parkingSpace: { ...patch } } } })).data
      }
      if (typeof onFormSuccess === 'function') {
        await onFormSuccess(data)
      }
    } catch (error) {
      console.error(error)
      setError(_.get(error, 'graphQLErrors[0].message'))
    }
  })
  return (
    <>
      <SpaceApproval space={parkingSpace} />
      <FormContext {...methods}>
        <form onSubmit={onSubmit} noValidate>
          <FormControl fullWidth className={classes.formControl} component="fieldset">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={7}>
                <FormControl fullWidth className={classes.formControl}>
                  <LocationField />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={5}>
                <HiddenIdController />
                <Grid container>
                  <Grid item xs={4}>
                    <Button type="button" color="primary" variant="contained">
                      <Link href={routes.spaces.index}>
                        <Avatar className={classes.avatar}>
                          <ParkhandsLogo fontSize="small" />
                        </Avatar>
                      </Link>
                      <Typography color="textPrimary">
                        {t('inventory', { ns: Domain.Spaces })}
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={8}>
                    <FormFooter
                      submit
                      submitProps={{ loading }}
                      cancel
                      cancelProps={{ ...routes.spaces.index }}
                      resetProps={{ onClick: () => reset(defaultValues) }}
                      {...(parkingSpace?.id
                        ? {
                            deleteButton: true,
                            deleteProps: {
                              onConfirm: async () => {
                                try {
                                  await deleteSlot({ variables: { id: parkingSpace?.id } })
                                } catch (error) {
                                  console.error(error)
                                } finally {
                                  const { href, as } = routes.spaces.index
                                  router.push(href, as)
                                }
                              },
                            },
                          }
                        : {})}
                    />
                  </Grid>
                </Grid>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginTop="16px">
                  <Typography variant="h3">Create Parking Space</Typography>
                  <FormControl className={classes.statusField}>
                    <FormControlLabel label="Status" control={<SpaceStatusController />} />
                  </FormControl>
                </Box>

                <Box color="secondary">
                  <Typography color="secondary">
                    {t('basic_info', { ns: Domain.Spaces })}
                  </Typography>
                </Box>
                <FormControl fullWidth className={classes.formControl}>
                  <NameController label="Name" />
                </FormControl>
                <Grid container>
                  <Grid item xs={6}>
                    <FormControl fullWidth className={classes.formControl}>
                      <PhotoUrlField />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth className={classes.formControl}>
                      <SpaceCategoryController />
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                      <SpaceAccessRestrictionsController />
                    </FormControl>
                  </Grid>
                </Grid>
                <FormControl fullWidth className={classes.formControl}>
                  <DescriptionController />
                </FormControl>
                {status === 'DISABLED' ? (
                  <FormControl fullWidth className={classes.formControl}>
                    <StatusDescriptionController />
                  </FormControl>
                ) : null}

                <FormControl fullWidth className={classes.formControl}>
                  <SetAvailabilityField />
                </FormControl>
              </Grid>
            </Grid>
          </FormControl>
          <FormError />

          {/* {!_.isEmpty(errors) && <pre>{JSON.stringify(errors, null, 2)}</pre>}
          {!_.isEmpty(watch()) && <pre>{JSON.stringify(watch(), null, 2)}</pre>} */}
        </form>
      </FormContext>
    </>
  )
}
