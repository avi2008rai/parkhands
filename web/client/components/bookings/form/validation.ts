import * as Yup from 'yup'
import { BookingStatusT } from 'gql/schema'

import { Domain, useDomain } from 'common/i18n'
import { id, licensePlate, phone } from 'common/validators'

const t = useDomain(Domain.Validation)

const paymentMethodId = Yup.string().required(t('no_payment_methods'))

const baseFields = {
  licensePlate,
  phone,
  startTime: Yup.date().required(t('required_start_time')),
  endTime: Yup.date().required(t('required_end_time')),
  status: Yup.mixed<BookingStatusT>().oneOf([
    BookingStatusT.Pending,
    BookingStatusT.Reserved,
    BookingStatusT.Canceled,
  ]),
  acceptedTerms: Yup.boolean()
    .required(t('error_terms_conditions'))
    .oneOf([true], t('error_terms_conditions')),
}

export const freeBookingSchema = Yup.object().shape(baseFields)
export const paidBookingSchema = Yup.object().shape({ paymentMethodId, ...baseFields })
