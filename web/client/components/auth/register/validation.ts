import * as Yup from 'yup'

import { Domain, useDomain } from 'common/i18n'
import { password, email } from 'common/validators'

const t = useDomain(Domain.Validation)

export default Yup.object().shape({
  email,
  password,
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], t('passwords_same')),
  newsletter: Yup.boolean().required(),
  acceptedTerms: Yup.boolean()
    .required(t('error_terms_conditions'))
    .oneOf([true], t('error_terms_conditions')),
})
