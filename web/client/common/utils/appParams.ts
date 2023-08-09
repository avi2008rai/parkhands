import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'

import { fetchUserFromToken } from 'common/utils/apolloClient'
import { CurrentUser } from 'gql/utils'

import { jwtCookieName } from './setJwtCookie'

export type JwtToken = {
  jwtToken: string
}
type ServerUser = {
  serverUser?: CurrentUser
}
export type SSPContext = Parameters<GetServerSideProps>[0] // SSP Context differs from NextPageContext
export type AppParams = JwtToken & ServerUser & Pick<GetServerSidePropsContext, 'query'>
export type Page<Query, Params> = AppParams & Query & Params

export const getServerSideProps: GetServerSideProps<AppParams> = async (ctx: SSPContext) => {
  const jwtToken = parseCookies(ctx)[jwtCookieName] || ''
  const props: AppParams = { jwtToken, query: ctx.query }
  if (jwtToken) {
    try {
      props.serverUser = await fetchUserFromToken({ jwtToken })
    } catch (error) {}
  }
  return { props }
}
