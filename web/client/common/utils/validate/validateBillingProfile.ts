import { CurrentUser } from 'gql/utils'

export const validateBillingProfile = (user: CurrentUser): string => {
  if (!user.billing_profile.id) {
    throw new Error(`The user has no billing_profile. User id: ${user.id}`)
  }
  return user.billing_profile.id
}
