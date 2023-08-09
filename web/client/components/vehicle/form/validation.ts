import _ from 'lodash'
import * as Yup from 'yup'
import { useDomain } from 'common/i18n'

import { id, status, licensePlate } from 'common/validators'
import { Domain } from 'common/i18n/locale'

const t = useDomain(Domain.Validation)
const baseFields = {
  status,
  licensePlate,
  vehicleTypeId: Yup.string().required(t('required_vehicle_type')).nullable(),
  vehicleSizeId: Yup.string().required(t('required_vehicle_size')),
}

export const schemaCreate = Yup.object().shape({ ...baseFields })

export const schemaUpdate = Yup.object().shape({ id, ...baseFields })
