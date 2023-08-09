import { NextPageContext } from 'next'

import routes from 'common/routes'
import component from 'components/auth/logout/LogoutPage'
import createPage from 'common/utils/createPage'
import { destroyJwtCookie } from 'common/utils/setJwtCookie'

export async function getServerSideProps(ctx: NextPageContext): Promise<{ props: {} }> {
  destroyJwtCookie(ctx) // Destroy cookie on server
  ctx.res?.writeHead(302, { Location: routes.login })
  ctx.res?.end()
  return { props: {} }
}

export default createPage({
  requireLogin: false,
  component,
})
