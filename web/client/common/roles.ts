import { UserRoleString } from 'gql/utils'

type RoleListItem = {
  name: UserRoleString
  label: string
}

export const systemRoles: RoleListItem[] = [
  { name: 'app_single_member', label: 'single_member' },
  { name: 'app_provider', label: 'Provider' },
  { name: 'app_provider_premium', label: 'Provider Premium' },
  { name: 'app_super_admin', label: 'super_admin' },
]
