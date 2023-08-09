import _ from 'lodash'
import Stripe from 'stripe'
import { format } from 'date-fns'
import { NextApiResponse, NextApiRequest } from 'next'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import { stripe } from 'common/utils/stripeServer'
export { config } from 'common/utils/middleware/resolver'
import { post } from 'common/utils/middleware/restrictMethod'
import { graphqlAuth } from 'common/utils/middleware/graphqlAuth'
import {
  StripeCustomerContext,
  withStripeCustomer,
} from 'common/utils/middleware/withStripeCustomer'
import {
  BookingStatusT,
  BookSlotDocument,
  BookSlotMutation,
  BookSlotMutationVariables,
  CreatePaymentReceiptDocument,
  CreatePaymentReceiptMutation,
  CreatePaymentReceiptMutationVariables,
  PickArrayType,
  SlotByIdDocument,
  SlotByIdQuery,
  UpdateBookingDocument,
  UpdateBookingMutation,
  UpdateBookingMutationVariables,
} from 'gql/schema'

// Example:
// {
//   "booking": {
//     "slotId": "d4063ef7-3115-4d5a-bba1-e84ef1409f28",
//     "phone": "14321432142",
//     "licensePlate": "CA 7251 A",
//     "startTime": "2020-09-12T10:45:00.000Z",
//     "endTime": "2020-09-12T12:05:00.000Z"
//   },
//   "payment": { "amount": 313, "paymentMethodId": "pm_1HQWBbKYksC71no8gsoEmDRV" }
// }

type SlotBooking = PickArrayType<BookSlotMutation['bookSlot']>['slotBooking']
type PaymentRecept = PickArrayType<
  CreatePaymentReceiptMutation['createPaymentReceipt']
>['paymentReceipt']

export type BookingReqBody = {
  booking: {
    slotId: string
    startTime: Date
    endTime: Date
    licensePlate: string
    phone: string
  }
  payment?: {
    amount: number // In euro cents. Integer only. No decimals. This solves a lot of rounding problems(or at least moves them to another place).
    paymentMethodId: string
  }
}
export type BookingResponse = {
  // All bookings
  booking?: SlotBooking
  // Paid bookings
  paymentIntent?: Stripe.PaymentIntent
  paymentReceipt?: PaymentRecept
  // Error
  statusCode?: number
  message?: string
}

const bookSlot = async (
  client: ApolloClient<NormalizedCacheObject>,
  payload: BookSlotMutationVariables['payload'],
) => {
  console.log('[ Book slot ]', payload)
  return await client.mutate<BookSlotMutation>({
    mutation: BookSlotDocument,
    variables: { payload },
  })
}
const updateBooking = async (
  client: ApolloClient<NormalizedCacheObject>,
  variables: UpdateBookingMutationVariables,
) => {
  console.log('[ Update booking ]', variables)
  return await client.mutate<UpdateBookingMutation>({ mutation: UpdateBookingDocument, variables })
}
const createPaymentReceipt = async (
  client: ApolloClient<NormalizedCacheObject>,
  paymentReceipt: CreatePaymentReceiptMutationVariables['input']['paymentReceipt'],
) => {
  console.log('[ Create payment receipt ]', paymentReceipt)
  return await client.mutate<CreatePaymentReceiptMutation>({
    mutation: CreatePaymentReceiptDocument,
    variables: { input: { paymentReceipt } },
  })
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BookingResponse>,
  { customer, auth: { user, client } }: StripeCustomerContext,
) => {
  const { payment, booking: bookingReqData } = req.body as BookingReqBody
  try {
    const { data: slotData } = await client.query<SlotByIdQuery>({
      query: SlotByIdDocument,
      variables: {
        id: bookingReqData.slotId,
      },
    })
    if (!slotData?.slot) {
      throw new Error('Invalid slotId')
    }
    const slot = slotData.slot
    const pricePerHour = parseInt(slot.pricePerHour)
    const freeBooking = pricePerHour === 0

    if (freeBooking) {
      const { data } = await bookSlot(client, {
        slotId: bookingReqData.slotId,
        userId: user.id,
        startTime: bookingReqData.startTime,
        endTime: bookingReqData.endTime,
        licensePlate: bookingReqData.licensePlate,
        phone: bookingReqData.phone,
      })
      // Send response
      res.status(200).json({
        booking: data?.bookSlot?.slotBooking,
      })
      return
    }

    if (payment?.amount === undefined || payment?.amount === null) {
      throw new Error('Missing param: amount')
    }
    if (payment.amount > 0 && !payment.paymentMethodId) {
      throw new Error('Missing param: paymentMethodId')
    }

    // TODO: Calculate the price on the server side too, to make sure everything is alright.
    const paymentMethod = await stripe.paymentMethods.retrieve(payment.paymentMethodId)
    if (!paymentMethod) {
      throw new Error('Invalid payment method')
    }

    // Create internal booking
    const { data } = await bookSlot(client, {
      slotId: bookingReqData.slotId,
      userId: user.id,
      startTime: bookingReqData.startTime,
      endTime: bookingReqData.endTime,
      licensePlate: bookingReqData.licensePlate,
      phone: bookingReqData.phone,
    })
    const booking = data?.bookSlot?.slotBooking
    if (!booking) {
      // TODO: Better error
      throw new Error('No Parkhands booking created.')
    }

    try {
      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: payment.amount,
        customer: customer.id,
        currency: 'EUR',
        payment_method: paymentMethod.id,
        description: `Booking for ${booking.slot?.name} from ${format(
          new Date(booking.startTime!),
          'P p',
        )} to ${format(new Date(booking.endTime!), 'P p')}`,
        metadata: {
          bookingId: booking.id,
          userId: user.id,
          slotId: booking.id,
        },
        // Capture payment right away
        confirm: true,
      })

      // Create internal receipt
      const { data } = await createPaymentReceipt(client, {
        ownerId: user.id,
        amount: payment.amount,
        paymentIntentId: paymentIntent.id,
        receiptUrl: paymentIntent.charges.data[0].receipt_url, // Assumes there is only one charge for the payment intent
        // Link payment receipt to slot booking
        slotBookingsUsingId: { connectById: [{ id: booking.id }] },
      })

      // Approve booking
      await updateBooking(client, {
        id: booking.id,
        patch: { status: BookingStatusT.Reserved },
      })

      // Send response
      res.status(200).json({
        booking,
        paymentIntent,
        paymentReceipt: data?.createPaymentReceipt?.paymentReceipt,
      })
    } catch (e) {
      // Cancel booking
      await updateBooking(client, {
        id: booking.id,
        patch: { status: BookingStatusT.Canceled },
      })
      throw e
    }
  } catch (e) {
    const statusCode = e.statusCode || 500
    console.error('[ Create booking error ]', e)
    res.status(statusCode).json({ statusCode, message: e.message })
  }
}

export default post(graphqlAuth(withStripeCustomer(handler)))
