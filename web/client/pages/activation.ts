import { GetServerSideProps } from 'next'

import createPage from 'common/utils/createPage'
import MapLayout from 'components/layout/MapLayout'
import { fetchUserFromToken } from 'common/utils/apolloClient'
import { AppParams, SSPContext } from 'common/utils/appParams'
import component from 'components/auth/confirm-email/ConfirmEmailPage'

export const getServerSideProps: GetServerSideProps<AppParams> = async (ctx: SSPContext) => {
  const jwtToken: string = (ctx.query.token as string) || ''
  const props: AppParams = { jwtToken, query: ctx.query }

  if (jwtToken) {
    try {
      props.serverUser = await fetchUserFromToken({ jwtToken })
    } catch (error) {
      console.error(error)
    }
  }
  return { props }
}

export default createPage({
  requireLogin: true,
  requirePermissions: true,
  layout: MapLayout,
  component,
})
