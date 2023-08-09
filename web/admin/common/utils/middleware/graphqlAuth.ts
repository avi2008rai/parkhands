import { NextApiRequest, NextApiResponse } from 'next'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import { CurrentUser } from 'gql/utils'
import { fetchUser, apolloAuthClient } from 'common/utils/apolloClient'

export interface AuthContext {
  jwtToken: string
  user: CurrentUser
  client: ApolloClient<NormalizedCacheObject>
}
export declare type AuthNextApiHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  auth: AuthContext,
) => void | Promise<void>

export const graphqlAuth = (handler: AuthNextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    // Validate Authorization header
    if (!req.headers.authorization) {
      throw new Error('Missing Authorization header')
    }

    // Use jwtToken to fetch user from graphql
    const jwtToken = req.headers.authorization.split('Bearer ')[1]
    if (!jwtToken) {
      throw new Error('Unauthenticated')
    }

    const client = apolloAuthClient({ jwtToken })
    const user = await fetchUser({ client })
    return handler(req, res, { user, jwtToken, client })
  } catch (err) {
    console.error('graphqlAuth:Error', err)
    const code: number = err?.networkError?.statusCode || 403
    return res.status(code).json({
      statusCode: code,
      message: err.message,
    })
  }
}
