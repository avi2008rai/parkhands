import { useAsync } from 'react-use'

import getGraphQLClient from 'utils/getGraphQLClient'
import { FindSlotsQueryVariables } from 'gql/schema'

export function useSlots(variables: FindSlotsQueryVariables) {
  const slots = useAsync(async () => {
    const client = getGraphQLClient()
    const { data } = await client.FindSlots(variables)
    return data?.findSlotsList
  }, [variables])

  return [slots.value || []]
}
