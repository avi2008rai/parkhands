import { useEffect } from 'react'

import {
  useCurrentUserLazyQuery,
  useUpdateProfileMutation,
  UpdateUserInputRecordInput,
} from 'gql/schema'
import { CurrentUser, UserRoleString } from 'gql/utils'
import { useUserContext } from 'components/hooks/useUserContext'

export type CanDo =
  | 'doEverything'
  | 'useAdmin'
  | 'subscribe'
  | 'createSlots'
  | 'approveSlots'
  | 'approveSpaces'
  | 'manageUsers'
  | 'manageSlots'
  | 'manageSpaces'
  | 'manageVehicles'
  | 'manageBookings'

export type UserCan = {
  [key in CanDo]: boolean
}

type UseUser = {
  user: CurrentUser
  userId: string
  loading: boolean
  role: {
    isAnonymous: boolean
    isSingleMember: boolean
    isProvider: boolean
    isProviderPremium: boolean
    isSuperAdmin: boolean
  }
  can: UserCan
  refreshUser: () => void
  updateProfile: (profile: UpdateUserInputRecordInput) => void
}

const checkRole = (user: CurrentUser | undefined, roles: UserRoleString[]) => {
  if (!user) {
    return false
  }
  return roles.includes(user.role)
}

export const useUser = (): UseUser => {
  const { currentUser: user, setCurrentUser } = useUserContext()
  const [refreshUser, { data, loading }] = useCurrentUserLazyQuery()
  const [updateProfile] = useUpdateProfileMutation()

  // Update user context with fresh data
  useEffect(() => {
    if (data?.currentUser) {
      setCurrentUser(data.currentUser as CurrentUser)
    }
  }, [data])

  return {
    loading,
    refreshUser,
    updateProfile: async (profile: UpdateUserInputRecordInput) => {
      if (user) {
        await updateProfile({
          variables: {
            payload: { id: user.id, ...profile },
          },
        })
        refreshUser()
      }
    },
    get user() {
      if (!user) {
        throw new Error('Current user not found')
      }
      return user
    },
    get userId() {
      if (!user?.id) {
        throw new Error('Current user ID not found')
      }
      return user.id
    },
    get role() {
      if (!user) {
        throw new Error('Current user not found')
      }
      return {
        isAnonymous: user.role == 'app_anonymous',
        isSingleMember: user.role == 'app_single_member',
        isProvider: user.role == 'app_provider',
        isProviderPremium: user.role == 'app_provider_premium',
        isSuperAdmin: user.role == 'app_super_admin',
      }
    },
    get can() {
      return {
        doEverything: checkRole(user, ['app_super_admin']),
        useAdmin: checkRole(user, ['app_provider', 'app_provider_premium', 'app_super_admin']),
        subscribe: checkRole(user, ['app_single_member', 'app_provider']),
        createSlots: checkRole(user, ['app_provider', 'app_provider_premium', 'app_super_admin']),
        approveSlots: checkRole(user, ['app_super_admin']),
        approveSpaces: checkRole(user, ['app_super_admin']),
        manageUsers: checkRole(user, ['app_super_admin']),
        manageSlots: checkRole(user, ['app_super_admin']),
        manageSpaces: checkRole(user, ['app_super_admin']),
        manageVehicles: checkRole(user, ['app_super_admin']),
        manageBookings: checkRole(user, ['app_provider_premium', 'app_super_admin']),
      }
    },
  }
}
