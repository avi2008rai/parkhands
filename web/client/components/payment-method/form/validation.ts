import _ from 'lodash'
import * as Yup from 'yup'

import { name } from 'common/validators'
import { Domain, useDomain } from 'common/i18n'

const t = useDomain(Domain.Validation)

export const schemaCreate = Yup.object().shape({
  name,
  acceptedTerms: Yup.boolean()
    .required(t('error_terms_conditions'))
    .oneOf([true], t('error_terms_conditions')),
})
