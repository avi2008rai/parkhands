import getConfig from 'next/config'
import { GraphQLClient } from 'graphql-request'

import { getSdk } from 'gql/schema'

const {
  publicRuntimeConfig: { GRAPHQL_API_URL, GRAPHQL_API_ENDPOINT },
} = getConfig()

const client = new GraphQLClient(`${GRAPHQL_API_URL}${GRAPHQL_API_ENDPOINT}`)
export default function getGraphQLClient() {
  return getSdk(client)
}
