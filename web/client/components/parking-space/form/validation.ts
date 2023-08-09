import _ from 'lodash'
import * as Yup from 'yup'

import { id, name } from 'common/validators'

const baseFields = {
  name,
}

export const schemaCreate = Yup.object().shape({ ...baseFields })

export const schemaUpdate = Yup.object().shape({ id, ...baseFields })
