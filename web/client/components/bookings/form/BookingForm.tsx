import { Box, Grid, Portal, Typography } from '@material-ui/core'
import { useForm, FormContext } from 'react-hook-form'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import React, { useState, useEffect, useMemo, useCallback } from 'react'

import { useDomain, Domain } from 'common/i18n'
import { PickArrayType, SlotByIdQuery } from 'gql/schema'
import { useFetch } from 'components/hooks/useFetch'
import { useUser } from 'components/hooks/useUser'
import { useFilters } from 'components/hooks/useFilters'
import useFormError from 'components/hooks/useFormError'
import BookingInfo from 'components/bookings/BookingInfo'
import { useUserContext } from 'components/hooks/useUserContext'
import calculateBookingPrice from 'common/utils/calculateBookingPrice'
import EmailController from 'components/form/controller/EmailController'
import InputController from 'components/form/controller/InputController'
import DialogFormSubmitButton from 'components/common/form/DialogFormSubmitButton'
import { BookingReqBody, BookingResponse } from 'pages/api/booking/create'
import PhoneNumberController from 'components/profile/PhoneNumberController'
import PaymentMethodController from 'components/payment-method/controller/PaymentMethodController'
import VehicleLicensePlateController from 'components/vehicle/controller/VehicleLicensePlateController'
import ConsentCheckbox from 'components/privacy/ConsentCheckbox'

import { freeBookingSchema, paidBookingSchema } from './validation'
import BookingSuccess from './BookingSuccess'
import BookingTimeFields from './BookingTimeFields'
import BookingAuthentication from './booking-authentication/BookingAuthentication'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      margin: theme.spacing(3),
      [theme.breakpoints.only('xs')]: {
        margin: theme.spacing(2),
      },
    },
    cardElement: {
      borderRadius: theme.shape.borderRadius,
      borderColor: 'rgba(255, 255, 255, 0.23)',
      padding: theme.spacing(1.125),
      borderStyle: 'solid',
      borderWidth: 1,
      '&:hover': {
        borderColor: theme.palette.text.primary,
      },
      color: theme.palette.secondary.main,
    },
    section: {
      fontWeight: 'bold',
      fontSize: theme.typography.pxToRem(14),
    },
  }),
)

type BookingData = {
  slotId: string
  licensePlate: string
  paymentMethodId: string
  email: string
  phone: string
  startTime: Date
  endTime: Date
  acceptedTerms: boolean
}
type Slot = PickArrayType<SlotByIdQuery['slot']>
type BookingFormParams = {
  slot: Slot
  duration?: {
    startTime: Date
    endTime: Date
  }
  onFormSuccess?: () => void
}

export default function BookingForm({ slot, onFormSuccess, duration }: BookingFormParams) {
  const classes = useStyles()
  const t = useDomain(Domain.Forms)
  const { loggedIn, currentUser } = useUserContext()
  const { updateProfile } = useUser()
  const [createBooking, bookingResponse] = useFetch<BookingResponse, BookingReqBody>({
    method: 'POST',
    baseUrl: '/api/booking/create',
    throwErrors: true,
  })

  // Prepare initial booking start and end schedule
  const {
    time: { start, end },
  } = useFilters()

  const isFreeBooking = useMemo(() => parseFloat(slot.pricePerHour) === 0, [slot])

  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { FormError, setError, resetError, error } = useFormError()
  const methods = useForm<BookingData>({
    defaultValues: {
      slotId: slot.id,
      licensePlate: '',
      paymentMethodId: '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      startTime: duration?.startTime || start,
      endTime: duration?.endTime || end,
      acceptedTerms: false,
    },
    validationSchema: isFreeBooking ? freeBookingSchema : paidBookingSchema,
    mode: 'onBlur',
  })
  const { errors, handleSubmit, register, unregister, watch, setValue } = methods
  const { startTime, endTime } = watch(['startTime', 'endTime'])
  const paymentMethodPortal = React.useRef(null)
  const vehiclePortal = React.useRef(null)
  const bookingFormRef = React.useRef<HTMLFormElement>(null)

  // Register time schedule to be stored in form data
  useEffect(() => {
    register({ name: 'startTime' })
    register({ name: 'endTime' })
    return () => unregister(['startTime', 'endTime'])
  }, [])

  useEffect(() => {
    // Update initial values of email and phone when login state is changed
    setValue('email', currentUser?.email || '')
    setValue('phone', currentUser?.phone || '')
  }, [loggedIn])

  useEffect(() => {
    if (errors.acceptedTerms) {
      setError('error_terms_conditions', 'warning')
    } else {
      resetError()
    }
  }, [errors.acceptedTerms])

  const { priceDecimal: bookingPrice, priceInCents, hours: bookingDurationInHours } = useMemo(
    () => calculateBookingPrice({ slot, startTime, endTime }),
    [slot, startTime, endTime],
  )

  const prepareData = useCallback(
    (booking: BookingData): BookingReqBody => {
      // Free booking
      if (isFreeBooking) {
        return { booking }
      }

      return {
        booking,
        payment: {
          amount: priceInCents,
          paymentMethodId: booking.paymentMethodId,
        },
      }
    },
    [priceInCents, isFreeBooking],
  )

  const onSubmit = handleSubmit(async (booking: BookingData, e) => {
    resetError()
    try {
      setLoading(true)

      // Send request to create a subscription
      await createBooking({ body: prepareData(booking) })

      // Update user profile phone with the booking phone if not set
      if (currentUser && !currentUser.phone) {
        updateProfile({ phone: booking.phone })
      }
      // Proceed with update of the UI
      setSuccess(true)
      if (typeof onFormSuccess === 'function') {
        onFormSuccess()
      }
    } catch (error) {
      console.log('[ Booking error ]', error.message)
      switch (error.message) {
        case 'slot_unavailable_back_in_time':
          setError('error_booking_attempted_past')
          break
        case 'slot_unavailable_already_booked':
          setError('error_slot_already_booked')
          break
        case 'slot_unavailable_outside_wh':
          setError('error_parking_slot_not_available')
          break
        default:
          setError(error.message)
          break
      }
    } finally {
      setLoading(false)
    }
  })

  if (success && bookingResponse.data?.booking?.id) {
    return <BookingSuccess bookingId={bookingResponse.data?.booking?.id} />
  }

  return (
    <>
      <FormContext {...methods}>
        <Box flexGrow={12}>
          <form onSubmit={onSubmit} noValidate ref={bookingFormRef}>
            <InputController name="slotId" type="hidden" />
            <Box className={classes.box}>
              <Grid container direction="column" wrap="nowrap">
                <Grid item xs={12}>
                  <BookingInfo
                    slotName={slot.name}
                    slotId={slot.id}
                    bookingPrice={bookingPrice}
                    bookingDurationInHours={bookingDurationInHours}
                  />
                </Grid>
                <Grid item xs={12}>
                  <BookingTimeFields slotId={slot.id} />
                </Grid>
                {loggedIn && (
                  <>
                    <Grid item xs={12}>
                      <EmailController InputProps={{ readOnly: true }} />
                    </Grid>
                    <Grid item xs={12}>
                      <PhoneNumberController />
                    </Grid>
                    <Grid item xs={12}>
                      <div ref={vehiclePortal} />
                    </Grid>
                    {!isFreeBooking && (
                      <Grid item>
                        <Typography
                          align="left"
                          variant="subtitle2"
                          className={classes.section}
                          gutterBottom>
                          {t('payment_methods')}
                        </Typography>
                        <div ref={paymentMethodPortal} />
                      </Grid>
                    )}
                    <Grid item>
                      <ConsentCheckbox />
                    </Grid>
                    {error && ( // Make sure there is no empty grid item element. It still has margins and "messes" the layout.
                      <Grid item>
                        <FormError />
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
            </Box>
            {/* <Box>
              <Typography>Errors</Typography>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
              <Typography>form values</Typography>
              <pre>{JSON.stringify(watch(), null, 2)}</pre>
            </Box> */}
          </form>
        </Box>
        {loggedIn && (
          <DialogFormSubmitButton
            formRef={bookingFormRef}
            color="secondary"
            loading={loading}
            label={isFreeBooking ? 'reserve' : 'pay'}
          />
        )}
        <Portal container={paymentMethodPortal.current}>
          {loggedIn && <PaymentMethodController />}
        </Portal>
        <Portal container={vehiclePortal.current}>
          {loggedIn && <VehicleLicensePlateController />}
        </Portal>
      </FormContext>
      {!loggedIn && <BookingAuthentication />}
    </>
  )
}
