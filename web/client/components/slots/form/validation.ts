import * as Yup from 'yup'
import { SlotStatusT } from 'gql/schema'

import { id, name, latitude, longitude } from 'common/validators'
import { useDomain, Domain } from 'common/i18n'

const t = useDomain(Domain.Validation)

const baseFields = {
  name,
  pricePerHour: Yup.number().test({
    name: 'isFree',
    exclusive: true,
    test: (value) => {
      if (value === null) {
        return new Yup.ValidationError(t('price_required'), value, 'pricePerHour')
      }
      if (value > 0 && value < 1) {
        return new Yup.ValidationError(t('min_price_per_hour'), value, 'pricePerHour')
      }
      if (value > 200) {
        return new Yup.ValidationError(t('max_price_per_hour'), value, 'pricePerHour')
      }
      return true
    },
  }),
  description: Yup.string().trim(),
  notes: Yup.string().trim(),
  vehicleSizeId: Yup.string().trim().required(t('required_type')),
  status: Yup.mixed<SlotStatusT>().oneOf([SlotStatusT.Enabled, SlotStatusT.Disabled]),
  availability: Yup.array()
    .of(
      Yup.object().shape({
        enabled: Yup.boolean(),
        dayOfWeek: Yup.number().min(0).max(6),
        startHour: Yup.date().typeError('Start time is required'),
        endHour: Yup.date().typeError('End time is required'),
      }),
    )
    .compact((value) => {
      return value.enabled !== true
    })
    .required(t('min_day_required')),
  lat: latitude,
  lng: longitude,
}

export const schemaCreate = Yup.object().shape(baseFields)
export const schemaUpdate = Yup.object().shape({ id, ...baseFields })
