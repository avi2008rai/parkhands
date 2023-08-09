import getConfig from 'next/config'
import { parseCookies } from 'nookies'
import { NextPageContext } from 'next'
import { setContext } from '@apollo/client/link/context'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { ApolloClient, NormalizedCacheObject, InMemoryCache } from '@apollo/client'

import { CurrentUserQuery, CurrentUserDocument } from 'gql/schema'
import { CurrentUser } from 'gql/utils'

import { JwtToken } from './appParams'
import { jwtCookieName } from './setJwtCookie'

const config = getConfig().publicRuntimeConfig

export type ApolloLinkProps = {
  jwtToken?: string
  sendAuthHeader?: boolean
}
type InitialState = { initialState: NormalizedCacheObject }
type ApolloClientFactoryProps = ApolloLinkProps & InitialState

type NextRequest = Pick<NextPageContext, 'req'>

export function apolloLink({ jwtToken, sendAuthHeader }: ApolloLinkProps) {
  const httpLink = new BatchHttpLink({
    uri: `${config.GRAPHQL_API_URL}${config.GRAPHQL_API_ENDPOINT}`,
    fetch,
  })

  const authLink = setContext((_, { headers, skipAuthorization }) => {
    // Skip authorization on per request basis
    if (skipAuthorization) {
      return { headers }
    }

    // Don't add the authorization header if no login is required
    if (!sendAuthHeader || !jwtToken) {
      return { headers }
    }

    if (sendAuthHeader && !jwtToken) {
      throw new Error('Page requires authentication, but jwt token is not provided')
    }

    // Return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  })

  return authLink.concat(httpLink)
}

export function apolloClientFactory({
  jwtToken,
  sendAuthHeader,
  initialState,
}: ApolloClientFactoryProps) {
  return new ApolloClient({
    link: apolloLink({ jwtToken, sendAuthHeader }),
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    ssrForceFetchDelay: 100,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      /*
        query: {
          fetchPolicy: 'network-only',
        },
        mutate: {
          fetchPolicy: 'network-only',
        },
      */
    },
  })
}

export const apolloAuthClient = ({ jwtToken }: JwtToken) =>
  apolloClientFactory({
    jwtToken,
    sendAuthHeader: true,
    initialState: {},
  })

export const apolloPublicClient = () =>
  apolloClientFactory({
    sendAuthHeader: false,
    initialState: {},
  })

export const apolloClientFromCtx = (ctx: NextRequest) => {
  const jwtToken = parseCookies(ctx)[jwtCookieName] || ''
  return apolloAuthClient({ jwtToken })
}

export const fetchUserFromToken = async ({ jwtToken }: JwtToken) => {
  const client = apolloAuthClient({ jwtToken })
  return fetchUser({ client })
}

type FetchUserParams = { client: ApolloClient<NormalizedCacheObject> }
export const fetchUser = async ({ client }: FetchUserParams) => {
  try {
    const { data } = await client.query<CurrentUserQuery>({ query: CurrentUserDocument })
    return data?.currentUser as CurrentUser
  } catch (error) {
    console.error({ error })
    throw error
  }
}
