import _ from 'lodash'
import * as Yup from 'yup'
import { useDomain } from 'common/i18n'

import { id, name, longitude, latitude } from 'common/validators'
import { Domain } from 'common/i18n/locale'

const t = useDomain(Domain.Validation)
const baseFields = {
  name,
  photoUrl: Yup.string().url(),
  markerUrl: Yup.string().url(),
  description: Yup.string().required(t('required_account')).nullable(),
  longitude,
  latitude,
}

export const schemaCreate = Yup.object().shape({ ...baseFields })

export const schemaUpdate = Yup.object().shape({ id, ...baseFields })
