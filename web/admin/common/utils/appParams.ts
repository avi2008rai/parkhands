import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

import { apolloClientFromCtx } from 'common/utils/apolloClient'
import { CurrentUserDocument } from 'gql/schema'
import { CurrentUser, CurrentUserQuery } from 'gql/utils'

import { jwtCookieName } from './setJwtCookie'

export type JwtToken = {
  jwtToken: string
}
type ServerUser = {
  serverUser?: CurrentUser
}
export type SSPContext = Parameters<GetServerSideProps>[0] // SSP Context differs from NextPageContext
export type AppParams = JwtToken & ServerUser
export type Page<Query, Params> = AppParams & Query & Params

export const getServerSideProps: GetServerSideProps<AppParams> = async (ctx: SSPContext) => {
  const jwtToken = parseCookies(ctx)[jwtCookieName] || ''
  const props: AppParams = { jwtToken }

  if (jwtToken) {
    const client = apolloClientFromCtx(ctx)
    try {
      const { data } = await client.query<CurrentUserQuery>({
        query: CurrentUserDocument,
      })
      props.serverUser = data?.currentUser
    } catch (error) {
      console.error({ error })
    }
  }
  return { props }
}
