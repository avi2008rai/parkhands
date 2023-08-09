import Router from 'next/router'

import routes from 'common/routes'
import component from 'components/auth/logout'
import createPage from 'common/utils/createPage'
import { destroyJwtCookie } from 'common/utils/setJwtCookie'

/* @Disabled
export async function getServerSideProps(ctx: NextPageContext): Promise<{ props: {} }> {
  destroyJwtCookie(ctx) // Destroy cookie on server
  ctx.res?.writeHead(302, { Location: routes.dashboard })
  ctx.res?.end()
  return { props: {} }
} */

export default createPage({
  component,
  requireLogin: false,
  requirePermissions: false,
  getInitialProps: async (ctx) => {
    if (ctx.res) {
      destroyJwtCookie(ctx) // Destroy cookie on server
      ctx.res?.writeHead(302, { Location: routes.dashboard })
      ctx.res?.end()
    } else {
      window.location.href = routes.logout
    }
    return {}
  },
})
