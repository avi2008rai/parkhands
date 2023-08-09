import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import {
  UpdateBillingProfileMutation,
  UpdateBillingProfileDocument,
  UpdateBillingProfileMutationVariables,
} from 'gql/schema'

export const updateBillingProfile = async (
  client: ApolloClient<NormalizedCacheObject>,
  variables: UpdateBillingProfileMutationVariables,
) => {
  console.log('[ Update billing profile ]', variables)
  return await client.mutate<UpdateBillingProfileMutation>({
    mutation: UpdateBillingProfileDocument,
    variables,
  })
}
