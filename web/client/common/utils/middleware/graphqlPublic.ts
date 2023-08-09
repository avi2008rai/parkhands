import { NextApiRequest, NextApiResponse } from 'next'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import { CurrentUser } from 'gql/utils'
import { apolloPublicClient } from 'common/utils/apolloClient'

export interface PublicContext {
  client: ApolloClient<NormalizedCacheObject>
}
export interface AuthContext extends PublicContext {
  jwtToken: string
  user: CurrentUser
  customerId: string | null
}
export declare type AuthNextApiHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  auth: PublicContext,
) => void | Promise<void>

export const graphqlPublic = (handler: AuthNextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const client = apolloPublicClient()
    return handler(req, res, { client })
  } catch (err) {
    console.error('graphqlPublic:Error', err)
    const code: number = err?.networkError?.statusCode || 403
    return res.status(code).json({
      statusCode: code,
      message: err.message,
    })
  }
}
