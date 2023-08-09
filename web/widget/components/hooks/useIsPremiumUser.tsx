import { useAsync } from 'react-use'

import getGraphQLClient from 'utils/getGraphQLClient'

export function useIsPremiumUser(providerId: string) {
  const isPremium = useAsync(async () => {
    const client = getGraphQLClient()
    const { data } = await client.userPremium({ userId: providerId })
    return !!data?.userPremium
  }, [providerId])

  // While the request is in flight, mark the user as premium.
  // This way there won't be flickering of invalid overlay
  // when the user is premium.
  // We are sacrificing that invalid users are gonna have a flicker
  // of "premium" widget.
  // We are valuing the experience of premium users more than the
  // potential "flash of premiumness" to non-premium users.
  if (isPremium.loading) {
    return [true]
  }
  
  return [!!isPremium.value]
}
