import * as Yup from 'yup'
import { StatusT } from 'gql/schema'

import { id, name, latitude, longitude, slotId } from 'common/validators'

import { Domain } from 'common/i18n/locale'

import { useDomain } from 'common/i18n'

const t = useDomain(Domain.Slots)

const baseFields = {
  name,
  slotId,
  pricePerHour: Yup.number()
    .positive(t('positive_price'))
    .lessThan(200, t('lessthan'))
    .typeError(t('price_required')),
  description: Yup.string().trim(),
  notes: Yup.string().trim(),
  amenities: Yup.object().shape({
    ids: Yup.string(),
    name: Yup.string(),
  }),
  level: Yup.number().typeError(t('flr_no_required')),
  vehicleSizeId: Yup.string().trim().required(t('type_required')),
  parkingSpaceId: Yup.string().trim().required(t('space_name_required')),
  availability: Yup.array()
    .of(
      Yup.object()
        .required()
        .shape({
          dayOfWeek: Yup.number().min(0).max(6).required(),
          startHour: Yup.date().typeError(t('start_time_req')).required(),
          endHour: Yup.date()
            .typeError(t('end_time_required'))
            .min(Yup.ref('startHour'), t('end_time_first'))
            .required(),
        }),
    )
    .required()
    .compact((value) => {
      return value.startHour === null && value.endHour === null
    })
    .required(t('min_day')),
  status: Yup.mixed<StatusT>().oneOf([StatusT.Enabled, StatusT.Disabled, StatusT.Pending]),
  lat: latitude,
  lng: longitude,
}

export const schemaCreate = Yup.object().shape(baseFields)

export const schemaUpdate = Yup.object().shape({
  id,
  ...baseFields,
})
