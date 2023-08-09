import * as Yup from 'yup'
import { StatusT } from 'gql/schema'
import { UserRoleString } from 'gql/utils'

import { Domain } from 'common/i18n/locale'

import { useDomain } from 'common/i18n'

const t = useDomain(Domain.Register)

const baseSchema = {
  name: Yup.string().min(5, t('too_short')).max(100, t('too_long')).trim().required(t('name_required')),
  email: Yup.string().email(t('invalid_email')).trim().required(t('email_required')),
  status: Yup.mixed<StatusT>().oneOf([StatusT.Enabled, StatusT.Disabled, StatusT.Pending]),
  role: Yup.mixed<UserRoleString>().oneOf([
    'app_anonymous',
    'app_single_member',
    'app_provider',
    'app_provider_premium',
    'app_super_admin',
  ]),
}

export const schemaCreate = Yup.object().shape(baseSchema)

export const schemaUpdate = Yup.object().shape({
  id: Yup.string().required('ID is required'),
  ...baseSchema,
})
