import * as Yup from 'yup'

import { name, email, phone } from 'common/validators'
import { useDomain, Domain } from 'common/i18n'

const t = useDomain(Domain.Validation)

export default Yup.object().shape({
  name,
  email,
  phone,
  vatNumber: Yup.string(),
  address: Yup.object().shape({
    city: Yup.string(),
    country: Yup.string().length(2, t('select_country')), // ISO 3166-1 alpha-2
    line1: Yup.string(),
    line2: Yup.string(),
    postal_code: Yup.string(),
    state: Yup.string(),
  }),
})
