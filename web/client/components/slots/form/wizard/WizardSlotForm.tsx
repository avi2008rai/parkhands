import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { Point } from 'geojson'
import { useTranslation } from 'react-i18next'
import { useForm, FormContext, DeepPartial } from 'react-hook-form'
import { Box, Button, Grid, Typography, Portal } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'
import {
  crs,
  ManageSlotQuery,
  PickArrayType,
  SlotStatusT,
  useCreateSlotMutation,
  useVehicleSizesListQuery,
} from 'gql/schema'
import AvailabilityField, {
  AvailabilityRecord,
  prepareSlotPayload,
  initSlotAvailability,
} from 'components/availability/AvailabilityField'
import { useUser } from 'components/hooks/useUser'
import useFormError from 'components/hooks/useFormError'
import { useFormWizard } from 'components/hooks/useFormWizard'
import LocationPicker, {
  defaultPosition,
} from 'components/slots/map/location-picker/LocationPicker'
import AmenitiesField from 'components/amenity/AmenitiesField'
import SubmitButton from 'components/common/form/SubmitButton'
import NameController from 'components/form/controller/NameController'
import InputController from 'components/form/controller/InputController'
import StepWizardIndicator from 'components/common/form/StepWizardIndicator'
import PriceController from 'components/slots/form/controller/PriceController'
// import VehicleSizeController from 'components/vehicle/controller/VehicleSizeController'
import DescriptionController from 'components/slots/form/controller/DescriptionController'
import ParkingSpaceController from 'components/parking-space/controller/ParkingSpaceController'

import { schemaCreate } from '../validation'
import PhotoUrlField from '../PhotoUrlField'
import SlotWizardStep from './SlotWizardStep'
import SlotWizardHeader from './SlotWizardHeader'

type Amenities = { [key: string]: string }
type Slot = PickArrayType<ManageSlotQuery['slot']>
type ExtendedSlot = Slot & {
  timezone: string
  amenities: Amenities
  availability: AvailabilityRecord[]
} & google.maps.LatLngLiteral
type SlotFormParams = {
  onFormSuccess?: () => void
  onCreateSuccess?: () => void
  onClose?: () => void
}
type FormData = {
  name: string
  photoUrl: string
  timezone: string
  pricePerHour: number
  address: {}
  amenities: {}
  availability: AvailabilityRecord[]
  vehicleSizeId: string
  parkingSpaceId: string
  description: string
  notes: string
  status: SlotStatusT
  lat: number
  lng: number
}
function getDefaultValues(): FormData {
  return {
    // Default slot values
    name: '',
    photoUrl: '',
    timezone: 'Europe/Berlin',
    pricePerHour: 0,
    address: {},
    amenities: {},
    availability: initSlotAvailability(),
    vehicleSizeId: '',
    parkingSpaceId: '',
    description: '',
    notes: '',
    status: SlotStatusT.Enabled,
    lat: defaultPosition.lat,
    lng: defaultPosition.lng,
  }
}

export default function WizardSlotForm({
  onFormSuccess,
  onCreateSuccess,
  onClose,
}: SlotFormParams) {
  const parkingSpacePortal = React.useRef(null)
  const { t } = useTranslation(Domain.Forms)
  const { activeStep, next } = useFormWizard()
  const { userId } = useUser()
  const { FormError, setError, resetError } = useFormError()
  const { data: sizesData } = useVehicleSizesListQuery({ fetchPolicy: 'cache-first' })
  const [formData, setFormData] = useState<FormData>(getDefaultValues())
  const methods = useForm<ExtendedSlot>({
    defaultValues: formData,
    validationSchema: schemaCreate,
    mode: 'onBlur',
  })
  const { errors, register, reset, setValue, triggerValidation, unregister, watch } = methods
  const [createSlot, { loading: createLoading }] = useCreateSlotMutation()

  const loading = createLoading
  const values = watch({ nest: true })

  useEffect(() => {
    // Preselect first vehicle size to make the field as optional selection
    if (sizesData?.vehicleSizesList && sizesData.vehicleSizesList?.length > 0) {
      setFormData({ ...formData, vehicleSizeId: sizesData.vehicleSizesList[0].id })
    }
  }, [sizesData, setFormData])

  useEffect(() => {
    register('address')
    register('timezone')
    return () => unregister(['address', 'timezone'])
  }, [register, unregister])

  useEffect(() => {
    // Fill hidden inputs on change of wizard step
    reset(formData)
  }, [activeStep])

  // Validates and sets the passed fields.
  // Returns the whole form data(including the updated fields).
  // Returns null if validation haven't passed.
  const setFields = async (fields: (keyof DeepPartial<FormData>)[]) => {
    let anyFieldErrored = false
    const newFormDataPartial: DeepPartial<FormData> = {}

    for (let index = 0; index < fields.length; index++) {
      const field = fields[index]
      const valid = await triggerValidation(field)
      if (valid && !Boolean(errors[field])) {
        newFormDataPartial[field] = values[field] as any // we know what we are doing :D
        setValue(field, values[field])
        setFormData({ ...formData, ...(newFormDataPartial as FormData) })
      } else {
        anyFieldErrored = true
      }
    }
    if (!anyFieldErrored) {
      return { ...formData, ...newFormDataPartial } as FormData
    }
    return null
  }

  const submitStep = async (fields: (keyof DeepPartial<FormData>)[]) => {
    if (await setFields(fields)) {
      next()
    }
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    switch (activeStep) {
      case 0:
        submitStep(['name'])
        break
      case 1:
        submitStep(['lat', 'lng', 'address', 'timezone'])
        break
      case 2:
        submitStep(['pricePerHour'])
        break
      case 3:
        submitStep(['availability'])
        break
    }

    if (activeStep === 4) {
      resetError()
      const updatedFormData = await setFields([
        'description',
        'amenities',
        'photoUrl',
        'parkingSpaceId',
      ])
      if (updatedFormData) {
        try {
          const location: Point = {
            type: 'Point',
            coordinates: [updatedFormData.lng, updatedFormData.lat],
            // @ts-ignore Geo CRS
            crs,
          }
          const selectedAmenities = _.omitBy(updatedFormData.amenities, _.isEmpty)
          const slotData = {
            location,
            name: updatedFormData.name,
            notes: updatedFormData.notes,
            status: updatedFormData.status,
            ownerId: userId,
            address: updatedFormData.address,
            timezone: updatedFormData.timezone,
            photoUrl: updatedFormData.photoUrl,
            description: updatedFormData.description,
            pricePerHour: updatedFormData.pricePerHour,
            vehicleSizeId: updatedFormData.vehicleSizeId,
            parkingSpaceId: values.parkingSpaceId === '' ? null : values.parkingSpaceId, // optional
            slotAmenitiesUsingId: {
              deleteOthers: true,
              create: _.map(selectedAmenities, (value, amenityId) => ({ amenityId })),
            },
            slotAvailabilitiesUsingId: prepareSlotPayload(updatedFormData.availability),
          }
          await createSlot({ variables: { payload: { slot: slotData } } })
          if (typeof onCreateSuccess === 'function') {
            onCreateSuccess()
          }
          next()
        } catch (error) {
          setError(_.get(error, 'graphQLErrors[0].message'))
        }
      }
    }
  }

  return (
    <FormContext {...methods}>
      <form onSubmit={onSubmit} noValidate>
        <SlotWizardHeader title="add_new_parking_slot" onClose={onClose} />
        <InputController name="lat" type="hidden" />
        <InputController name="lng" type="hidden" />
        <SlotWizardStep
          index={0}
          title="give_slot_name"
          fields={<NameController autoFocus />}
          button={
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => submitStep(['name'])}>
              {t('Continue')}
            </Button>
          }
        />
        <SlotWizardStep
          index={1}
          title="where_slot_located"
          fields={
            <Grid container direction="column">
              <Grid item>
                <LocationPicker />
              </Grid>
              <Grid item>
                <Typography align="center">{t('click_map_move_exact_space_location')}</Typography>
              </Grid>
            </Grid>
          }
          button={
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => submitStep(['lat', 'lng', 'address', 'timezone'])}>
              {t('continue')}
            </Button>
          }
        />
        <SlotWizardStep
          index={2}
          title={t('charge_per_hour')}
          fields={<PriceController fullWidth />}
          button={
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => submitStep(['pricePerHour'])}>
              {t('continue')}
            </Button>
          }
        />
        <SlotWizardStep
          index={3}
          title={t('title_slot_available')}
          fields={<AvailabilityField />}
          button={
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => submitStep(['availability'])}>
              {t('continue')}
            </Button>
          }
        />
        <SlotWizardStep
          index={4}
          title={t('describe_your_slot')}
          fields={
            <Grid container direction="column">
              <Grid item>
                <PhotoUrlField />
              </Grid>
              <Grid item>
                <AmenitiesField />
              </Grid>
              {/* @Disabled */}
              {/* <Grid item>
                <VehicleSizeController label="slot_type" />
              </Grid> */}
              <Grid item>
                <div ref={parkingSpacePortal} />
              </Grid>
              <Grid item>
                <DescriptionController fullWidth />
              </Grid>
            </Grid>
          }
          button={
            <Box textAlign="center">
              <SubmitButton loading={loading} fullWidth />
            </Box>
          }
        />
        <SlotWizardStep
          index={5}
          fields={
            <Typography variant="h3" align="center">
              {t('new_slot_added')}
            </Typography>
          }
          button={
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => {
                if (typeof onFormSuccess === 'function') {
                  onFormSuccess()
                }
              }}>
              {t('Done')}
            </Button>
          }
        />
        <FormError />
        <StepWizardIndicator noMargin />
        {/* {!_.isEmpty(errors) && <pre>{JSON.stringify(errors, null, 2)}</pre>} */}
        {/* {!_.isEmpty(watch()) && <pre>{JSON.stringify(watch(), null, 2)}</pre>} */}
      </form>
      {/* Prevents "nested" form submission from submitting the "parent" form. */}
      <Portal container={parkingSpacePortal.current}>
        <ParkingSpaceController />
      </Portal>
    </FormContext>
  )
}
