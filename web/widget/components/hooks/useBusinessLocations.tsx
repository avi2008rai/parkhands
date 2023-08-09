import { useAsync } from 'react-use'

import getGraphQLClient from 'utils/getGraphQLClient'
import { FindBusinessQueryVariables } from 'gql/schema'

export function useBusinessLocations(variables: FindBusinessQueryVariables) {
  const businessList = useAsync(async () => {
    const client = getGraphQLClient()
    const { data } = await client.FindBusiness(variables)
    return data?.findBusinessList
  }, [variables])

  return [businessList.value || []]
}
