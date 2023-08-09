import _ from 'lodash'
import * as Yup from 'yup'
import { StatusT } from 'gql/schema'
import { Domain } from 'common/i18n/locale'

import { useDomain } from 'common/i18n'

const t = useDomain(Domain.Register)
const t1 = useDomain(Domain.Pages)
const t2 = useDomain(Domain.Slots)

const baseFields = {
  name: Yup.string()
    .min(5, t('too_short'))
    .max(100, t('too_long'))
    .trim()
    .required(t('name_required')),
  status: Yup.mixed<StatusT>().oneOf([StatusT.Enabled, StatusT.Disabled, StatusT.Pending]),
  vehicleTypeId: Yup.string().required('Vehicle Type is required').nullable(),
  vehicleSizeId: Yup.string().required('Vehicle Size is required'),
  licensePlate: Yup.string()
    .min(5, t('too_short'))
    .max(12, t('too_long'))
    .trim()
    .transform((value) => _.toUpper(value))
    .required(t1('license_plate_required')),
}

export const schemaCreate = Yup.object().shape({
  ...baseFields,
})

export const schemaUpdate = Yup.object().shape({
  id: Yup.string().required('ID is required'),
  ...baseFields,
})
