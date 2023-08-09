import * as Yup from 'yup'
import { StatusT } from 'gql/schema'

import { id, name, latitude, longitude } from 'common/validators'

import { Domain } from 'common/i18n/locale'

import { useDomain } from 'common/i18n'

const t = useDomain(Domain.Slots)

const baseFields = {
  name,
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

  status: Yup.mixed<StatusT>().oneOf([StatusT.Enabled, StatusT.Disabled, StatusT.Pending]),
  lat: latitude,
  lng: longitude,
}

export const schemaCreate = Yup.object().shape(baseFields)

export const schemaUpdate = Yup.object().shape({
  id,
  ...baseFields,
})
