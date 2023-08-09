import _ from 'lodash'
import React, { useMemo, useEffect, ChangeEvent, useState } from 'react'
const moment = require('moment')
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
import StatusController from 'components/common/form/controller/StatusController'
import TempUnavailableField from './TempUnavailableField'
import RadioController from './controller/RadioController'
import HiddenIdController from 'components/common/form/controller/HiddenIdController'
import VehicleSizeField from 'components/vehicles/controller/field/VehicleSizeField'
import CategoryController from 'components/common/form/controller/CategoryController'
import SpaceNameController from 'components/common/form/controller/SpaceNameController'
import ParkingSlotIdController from './controller/ParkingSlotIdController'
import FloorController from 'components/common/form/controller/FloorController'
import {
  crs,
  ManageSlotQuery,
  SlotAmenity,
  SlotStatusT,
  useUpdateSlotMutation,
  useCreateSlotMutation,
  useListAmenitiesQuery,
  useDeleteSlotMutation,
  CreateSlotMutation,
  UpdateSlotMutation,
  SlotAmenitiesOrderBy,
} from 'gql/schema'

import useStyles from './styles'
import LocationField from './LocationField'
import { defaultPosition } from './LocationPicker'
import { schemaCreate, schemaUpdate } from './validation'
import DescriptionController from './controller/DescriptionController'
import NotesController from './controller/NotesController'
import PriceController from './controller/PriceController'
import AccessRestrictionsController from 'components/common/form/controller/AccessRestrictionsController'
import InactiveReasonController from 'components/common/form/controller/InactiveReasonController'
import { useUser } from 'components/hooks/useUser'
import AvailabilityField, {
  AvailabilityRecord,
  initSlotAvailability,
  prepareSlotPayload,
} from './AvailabilityField'
import PhotoUrlField from './PhotoUrlField'
import SlotApproval from './SlotApproval'
import { useDomain } from 'common/i18n'
import ParkhandsLogo from 'components/layout/logo'
import Link from 'components/common/Link'
import MaximumParkingTimeField from './controller/MaximumParkingTimeField'
import AmenitiesController from './controller/AmenitiesController'
type SlotForm = {
  id: string
  spaceNameList: string
  name: string
  slotId: string
  notes?: string | null
  photoUrl?: string | null
  description?: string | null
  ownerId: string
  pricePerHour: number
  categoryList: any
  maximumParkingTime: string
  level?: number | null
  accessRestrictions?: any
  amenities: Amenities
  vehicleSizeId: string
  parkingSpaceId: string
  status: SlotStatusT
  timezone: string
  lat: number
  lng: number
  shape: any
  address?: { [key: string]: unknown } | null
  availability: AvailabilityRecord[]
  waypoints?: { [key: string]: unknown } | null
  slotDimensions?: { [key: string]: string } | null
  businessStatusReason?: string | null
  tempUnavailable?: boolean
  tempUnavailableFrom: Date | null
  tempUnavailableTo: Date | null
  maxParkingTime?: number
}

type Amenities = { [key: string]: string }

function normalizeSlot({
  slot,
  ownerId,
}: ManageSlotQuery & { ownerId?: string }): DeepPartial<SlotForm> {
  if (!slot) {
    return {
      name: '',
      photoUrl: '',
      slotId: '',
      pricePerHour: 5,
      accessRestrictions: 'NONE',
      categoryList: 'PUBLIC',
      level: 0,
      amenities: {},
      vehicleSizeId: '',
      availability: initSlotAvailability(),
      description: '',
      notes: '',
      ownerId: '',
      status: SlotStatusT.Enabled,
      timezone: '',
      lat: defaultPosition.lat,
      lng: defaultPosition.lng,
      // waypoints: {},
      tempUnavailable: false,
      tempUnavailableFrom: null,
      tempUnavailableTo: null,
      slotDimensions: {},
      businessStatusReason: '',
      maximumParkingTime: '00:15',
    }
  }

  return {
    id: slot.id,
    name: slot.name,
    pricePerHour: slot.pricePerHour,
    // maximumParkingTime: slot.maximumParkingTime,
    accessRestrictions: slot.accessRestrictions,
    categoryList: slot.category,
    level: slot.level,
    photoUrl: slot.photoUrl || '',
    description: slot?.description || '',
    notes: slot?.notes || '',
    amenities: _.transform<Pick<SlotAmenity, 'amenityId'>, Amenities>(
      slot.slotAmenitiesList,
      (result, value) => {
        result[value.amenityId] = value.amenityId
      },
      {},
    ),
    ownerId: slot.owner?.id,
    vehicleSizeId: slot.vehicleSizeId,
    parkingSpaceId: slot.parkingSpaceId || '',
    availability: initSlotAvailability(slot.slotAvailabilitiesList),
    status: slot.status,
    timezone: slot.timezone,
    lat: slot.location.latitude,
    lng: slot.location.longitude,
    address: slot.address,
    shape: slot.shape,
    businessStatusReason: slot.businessStatusReason,
    waypoints: slot.waypoints,
    tempUnavailable: slot.tempUnavailable || false,
    tempUnavailableFrom: slot.tempUnavailableFrom,
    tempUnavailableTo: slot.tempUnavailableTo,
  }
}

type FormParams = {
  onFormSuccess?: (data?: UpdateSlotMutation | CreateSlotMutation | null) => void
  ownerId?: string
} & ManageSlotQuery

export default function SlotForm({ slot, onFormSuccess, ownerId }: FormParams) {
  const { userId } = useUser()

  const [duplicateEntry, setDuplicateEntry] = useState(false)
  const defaultValues = useMemo(() => normalizeSlot({ slot, ownerId }), [slot, ownerId])
  const validationSchema = useMemo(() => (slot ? schemaUpdate : schemaCreate), [slot])
  const methods = useForm<SlotForm>({
    defaultValues,
    validationSchema,
    mode: 'onBlur',
  })
  const { handleSubmit, reset, control, register, unregister, watch, errors, setValue } = methods

  const { FormFooter, FormError, setError, resetError } = useFormError()

  const { data: amenitiesData } = useListAmenitiesQuery()
  const [createSlot, { loading: createLoading }] = useCreateSlotMutation()
  const [updateSlot, { loading: updateLoading }] = useUpdateSlotMutation()
  const loading = createLoading || updateLoading
  const { t } = useTranslation([Domain.Amenities, Domain.Slots, Domain.General])
  const slotStatus = watch('status')
  const tempUnavailable = watch('tempUnavailable')
  const router = useRouter()
  const classes = useStyles()
  const [tempFromDate, setFromDate] = useState(new Date())
  const newFromDate = (val: any) => {
    setFromDate(val)
  }
  const [tempToDate, setToDate] = useState(new Date())
  const newToDate = (val: any) => {
    setToDate(val)
  }

  const tempUnavailableFromValue = defaultValues.tempUnavailableFrom
    ? new Date(moment(defaultValues.tempUnavailableFrom).format('MM/DD/YYYY'))
    : ''
  const tempUnavailableToValue = defaultValues.tempUnavailableTo
    ? new Date(moment(defaultValues.tempUnavailableTo).format('MM/DD/YYYY'))
    : ''
  useEffect(() => {
    register('address')
    register('timezone')
    register('lat')
    register('lng')
    register('shape')
    register('slotDimensions')
    register('waypoints')
    register('tempUnavailable')
    register('tempUnavailableFrom')
    register('tempUnavailableTo')
    register('amenities')
    return () => {
      unregister([
        'address',
        'timezone',
        'lat',
        'lng',
        'shape',
        'slotDimensions',
        'waypoints',
        'tempUnavailable',
        'tempUnavailableFrom',
        'tempUnavailableTo',
        'amenities',
      ])
    }
  }, [])
  const [deleteSlot] = useDeleteSlotMutation()
  const onSubmit = handleSubmit(async (values: SlotForm, e) => {
    e?.preventDefault()
    resetError()
    values.tempUnavailableFrom = tempFromDate
    values.tempUnavailableTo = tempToDate
    const location: Point = {
      type: 'Point',
      coordinates: [values.lng, values.lat],
      // @ts-ignore Geo CRS
      crs,
    }
    const selected = _.omitBy(values.amenities, _.isEmpty)
    const patch = {
      name: values.name,
      address: values.address,
      status: values.status,
      photoUrl: values.photoUrl,
      pricePerHour: values.pricePerHour,
      // This is will be added once the field is added in table
      // maximumParkingTime: values.maximumParkingTime,
      accessRestrictions: values.accessRestrictions,
      level: values.level,
      description: values.description,
      notes: values.notes,
      timezone: values.timezone,
      ownerId: userId,
      category: values.categoryList,
      location,
      slotAmenitiesUsingId: {
        deleteOthers: true,
        create: _.map(selected, (value, amenityId) => ({
          amenityId,
        })),
      },
      vehicleSizeId: values.vehicleSizeId,
      parkingSpaceId: values.parkingSpaceId,
      slotAvailabilitiesUsingId: prepareSlotPayload(values.availability),
      shape: values.shape,
      slotDimensions: values.slotDimensions,
      waypoints: values.waypoints,
      businessStatusReason: values.businessStatusReason,
      tempUnavailable: values.tempUnavailable,
      tempUnavailableFrom: values.tempUnavailableFrom,
      tempUnavailableTo: values.tempUnavailableTo,
    }

    try {
      let data
      if (slot && !duplicateEntry) {
        data = (await updateSlot({ variables: { id: slot.id, patch } })).data
      } else {
        data = (await createSlot({ variables: { payload: { slot: { ...patch } } } })).data
      }
      if (typeof onFormSuccess === 'function') {
        if (duplicateEntry) {
          //Code here to success message
        } else await onFormSuccess(data)
      }
    } catch (error) {
      setError(t('location_required', {ns:Domain.General}))
    }
  })

  return (
    <>
      <SlotApproval slot={slot} />
      <FormContext {...methods}>
        <form onSubmit={onSubmit} noValidate>
          <FormControl fullWidth className={classes.formControl} component="fieldset">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className={classes.formControl}>
                  <LocationField />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <HiddenIdController />
                <Grid container>
                  <Grid item xs={2}>
                    <Button type="button" color="primary" variant="contained">
                      <Link href={routes.slots.index}>
                        <Avatar className={classes.avatar}>
                          <ParkhandsLogo fontSize="small" />
                        </Avatar>
                      </Link>
                      <Typography color="textPrimary"> Inventroy</Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={10}>
                    <FormFooter
                      saveDuplicate
                      saveDuplicateProps={{
                        loading,
                        onClick: () => {
                          setDuplicateEntry(true)
                        },
                      }}
                      submit
                      submitProps={{
                        loading,
                        onClick: () => {
                          setDuplicateEntry(false)
                        },
                      }}
                      cancel
                      cancelProps={{ ...routes.slots.index }}
                      {...(slot?.id
                        ? {
                            deleteButton: true,
                            deleteProps: {
                              onConfirm: async () => {
                                try {
                                  await deleteSlot({ variables: { id: slot?.id } })
                                } catch (error) {
                                  console.error(error)
                                } finally {
                                  const { href, as } = routes.slots.index
                                  router.push(href, as)
                                }
                              },
                            },
                          }
                        : {})}
                    />
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="space-between">
                  <h3>Create Parking slot</h3>
                </Box>

                <Box color="secondary">
                  <Typography color="secondary">
                    {t('define_no_of_slots', { ns: Domain.Spaces })}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <h3>Basic Info</h3>
                  <FormControl className={classes.statusField}>
                    <FormControlLabel control={<StatusController />} label={t('active')} />
                  </FormControl>
                </Box>
                <Grid container>
                  <Grid item xs={12}>
                    <FormControl fullWidth className={classes.formControl}>
                      <SpaceNameController />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <FormControl fullWidth className={classes.formControl}>
                      <NameController label="Parking slot name" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth className={classes.formControl}>
                      <AccessRestrictionsController />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <FormControl fullWidth className={classes.formControl}>
                      <PhotoUrlField />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth className={classes.formControl}>
                      <MaximumParkingTimeField />
                    </FormControl>
                    <Grid container>
                      <Grid item xs={6}>
                        <FormControl fullWidth className={classes.formControl}>
                          <FloorController />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth className={classes.formControl}>
                          <CategoryController />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="space-between">
                  <FormControl className={classes.statusField}>
                    <FormControlLabel
                      control={<RadioController />}
                      label="Temporarily Unavailable"
                    />
                  </FormControl>
                </Box>
                {tempUnavailable === true ? (
                  <Grid container>
                    <Grid item xs={6}>
                      <FormControl fullWidth className={classes.formControl}>
                        <TempUnavailableField
                          label="From"
                          name="tempUnavailableFrom"
                          tempDate={tempUnavailableFromValue}
                          setTempDate={newFromDate}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth className={classes.formControl}>
                        <TempUnavailableField
                          label="To"
                          name="tempUnavailableTo"
                          tempDate={tempUnavailableToValue}
                          defaultDate={newToDate}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                ) : null}
                <FormControl fullWidth className={classes.formControl}>
                  <ParkingSlotIdController />
                </FormControl>
                <VehicleSizeField className={classes.formControl} label={t('Vehicle size')} />
                <FormControl fullWidth className={classes.formControl}>
                  <DescriptionController />
                </FormControl>
                <FormControl fullWidth className={classes.formControl}>
                  <NotesController />
                </FormControl>
                {slotStatus === 'DISABLED' ? (
                  <FormControl fullWidth className={classes.formControl}>
                    <InactiveReasonController />
                  </FormControl>
                ) : null}
                <FormControl fullWidth className={classes.formControl}>
                  <AmenitiesController
                    amenitiesData={amenitiesData}
                    slotAmenitiesList={slot?.slotAmenitiesList}
                  />
                </FormControl>
                <FormControl fullWidth className={classes.formControl}>
                  <PriceController />
                </FormControl>
                <FormControl fullWidth className={classes.formControl}>
                  <AvailabilityField />
                </FormControl>
              </Grid>
            </Grid>

            <FormError />
          </FormControl>

          {/* {!_.isEmpty(errors) && <pre>{JSON.stringify(errors, null, 2)}</pre>} */}
          {/* {!_.isEmpty(watch()) && <pre>{JSON.stringify(watch(), null, 2)}</pre>} */}
        </form>
      </FormContext>
    </>
  )
}
