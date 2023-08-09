import * as Yup from 'yup'
import { Domain } from 'common/i18n/locale'

import { useDomain } from 'common/i18n'

const t = useDomain(Domain.Register)

const schema = Yup.object().shape({

  email: Yup.string().email(t('invalid_email')).required(t('email_required')),
  password: Yup.string().min(8, t('too_short')).max(100, t('too_long')).required(t('pwd_required')),
  rememberMe: Yup.boolean(),
})

export default schema
