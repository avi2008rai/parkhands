import _ from 'lodash'
import React, { useMemo, useEffect } from 'react'
import { Point } from 'geojson'
import { FormControl, Box, Grid, Portal } from '@material-ui/core'
import { useForm, FormContext, DeepPartial } from 'react-hook-form'

import {
  crs,
  ManageSlotQuery,
  PickArrayType,
  SlotAmenity,
  SlotStatusT,
  useCreateSlotMutation,
  useUpdateSlotMutation,
} from 'gql/schema'
import AvailabilityField, {
  AvailabilityRecord,
  prepareSlotPayload,
  initSlotAvailability,
} from 'components/availability/AvailabilityField'
import { useUser } from 'components/hooks/useUser'
import useFormError from 'components/hooks/useFormError'
import AmenitiesField from 'components/amenity/AmenitiesField'
import LocationPicker from 'components/slots/map/location-picker/LocationPicker'
import NameController from 'components/form/controller/NameController'
import InputController from 'components/form/controller/InputController'
import NotesController from 'components/slots/form/controller/NotesController'
import PriceController from 'components/slots/form/controller/PriceController'
import VehicleSizeController from 'components/vehicle/controller/VehicleSizeController'
import ParkingSpaceController from 'components/parking-space/controller/ParkingSpaceController'
import HiddenIdController from 'components/form/controller/HiddenIdController'
import DescriptionController from 'components/slots/form/controller/DescriptionController'
import SubmitButton from 'components/common/form/SubmitButton'

import useStyles from './styles'
import { schemaCreate, schemaUpdate } from './validation'
import PhotoUrlField from './PhotoUrlField'
import SlotDeleteButton from './SlotDeleteButton'
import VerificationStatus from './VerificationStatus'

type Amenities = { [key: string]: string }
type Slot = PickArrayType<ManageSlotQuery['slot']>
type ExtendedSlot = Slot & {
  timezone: string
  amenities: Amenities
  availability: AvailabilityRecord[]
} & google.maps.LatLngLiteral
type SlotFormParams = {
  slot?: Slot
  onFormSuccess?: () => void
}

function normalizeSlot({ slot }: Pick<SlotFormParams, 'slot'>): DeepPartial<ExtendedSlot> {
  if (!slot) {
    return {
      // Default slot values
      name: '',
      photoUrl: '',
      timezone: 'Europe/Berlin',
      amenities: {},
      availability: initSlotAvailability(),
      pricePerHour: 0,
      vehicleSizeId: '',
      parkingSpaceId: '',
      description: '',
      notes: '',
      status: SlotStatusT.Enabled,
      lat: 0, // initial values will be overridden by LocationPicker
      lng: 0,
    }
  }
  return {
    ...slot,
    notes: slot.notes || '',
    photoUrl: slot.photoUrl || '',
    description: slot.description || '',
    parkingSpaceId: slot.parkingSpaceId || '',
    lat: slot.location.latitude,
    lng: slot.location.longitude,
    amenities: _.transform<Pick<SlotAmenity, 'amenityId'>, Amenities>(
      slot.slotAmenitiesList,
      (result, value) => (result[value.amenityId] = value.amenityId),
      {},
    ),
    availability: initSlotAvailability(slot.slotAvailabilitiesList),
  }
}

export default function SlotForm({ slot, onFormSuccess }: SlotFormParams) {
  const classes = useStyles()
  const parkingSpacePortal = React.useRef(null)
  const { userId } = useUser()
  const { FormError, setError, resetError } = useFormError()
  const methods = useForm<ExtendedSlot>({
    defaultValues: useMemo(() => normalizeSlot({ slot }), [slot]),
    validationSchema: slot ? schemaUpdate : schemaCreate,
    mode: 'onBlur',
  })
  const { handleSubmit, register, unregister } = methods
  const [createSlot, { loading: createLoading }] = useCreateSlotMutation()
  const [updateSlot, { loading: updateLoading }] = useUpdateSlotMutation()

  const loading = createLoading || updateLoading

  useEffect(() => {
    register('timezone')
    register('address')
    return () => unregister(['address', 'timezone'])
  }, [])

  const onSubmit = handleSubmit(async (values: ExtendedSlot, e) => {
    e?.preventDefault()
    resetError()
    try {
      const location: Point = {
        type: 'Point',
        coordinates: [values.lng, values.lat],
        // @ts-ignore Geo CRS
        crs,
      }
      const selectedAmenities = _.omitBy(values.amenities, _.isEmpty)
      const patch = {
        location,
        name: values.name,
        notes: values.notes,
        status: values.status,
        ownerId: userId,
        address: values.address,
        timezone: values.timezone,
        photoUrl: values.photoUrl,
        description: values.description,
        pricePerHour: values.pricePerHour,
        vehicleSizeId: values.vehicleSizeId,
        parkingSpaceId: values.parkingSpaceId === '' ? null : values.parkingSpaceId, // optional
        slotAmenitiesUsingId: {
          deleteOthers: true,
          create: _.map(selectedAmenities, (value, amenityId) => ({ amenityId })),
        },
        slotAvailabilitiesUsingId: prepareSlotPayload(values.availability),
      }
      if (slot) {
        await updateSlot({ variables: { id: slot.id, patch } })
      } else {
        await createSlot({ variables: { payload: { slot: { ...patch } } } })
      }
      if (typeof onFormSuccess === 'function') {
        await onFormSuccess()
      }
    } catch (error) {
      setError(_.get(error, 'graphQLErrors[0].message'))
    }
  })

  return (
    <FormContext {...methods}>
      <form onSubmit={onSubmit} noValidate>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <VerificationStatus slot={slot} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container direction="column" spacing={0}>
              {/* <FormControl className={classes.statusField}>
                <FormControlLabel control={<StatusController />} label="Active" />
              </FormControl> */}
              <HiddenIdController />
              <FormControl className={classes.formControl}>
                <NameController />
              </FormControl>
              <FormControl className={classes.formControl}>
                <PriceController />
              </FormControl>
              <FormControl className={classes.formControl}>
                <AmenitiesField />
              </FormControl>
              <VehicleSizeController
                style={{ display: 'none' }}
                className={classes.formControl}
                label="slot_type"
              />
              <FormControl className={classes.formControl}>
                <DescriptionController />
              </FormControl>
              <FormControl className={classes.formControl}>
                <NotesController />
              </FormControl>
              <FormControl className={classes.formControl}>
                <AvailabilityField />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container direction="column" spacing={0}>
              <div ref={parkingSpacePortal} />
              <InputController name="lat" type="hidden" />
              <InputController name="lng" type="hidden" />
              <FormControl className={classes.formControl}>
                <LocationPicker useFormPosition />
              </FormControl>
              <FormControl className={classes.formControl}>
                <PhotoUrlField />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormError />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-evenly">
              <FormControl className={classes.formControl}>
                <SubmitButton loading={loading} label="Save" />
              </FormControl>
              <SlotDeleteButton slot={slot} />
            </Box>
          </Grid>
        </Grid>
        {/* {!_.isEmpty(errors) && <pre>{JSON.stringify(errors, null, 2)}</pre>} */}
        {/* {!_.isEmpty(watch()) && <pre>{JSON.stringify(watch(), null, 2)}</pre>} */}
      </form>
      {/* Prevents "nested" form submission from submitting the "parent" form. */}
      <Portal container={parkingSpacePortal.current}>
        <ParkingSpaceController className={classes.formControl} />
      </Portal>
    </FormContext>
  )
}
