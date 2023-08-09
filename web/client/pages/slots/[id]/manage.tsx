import { GetServerSideProps } from 'next'

import createPage from 'common/utils/createPage'
import { getServerSideProps as appProps } from 'common/utils/appParams'
import component, { PageParams, QueryParams, fetcher } from 'components/slots/manage/ManageSlotPage'

export const getServerSideProps: GetServerSideProps<PageParams, QueryParams> = async (ctx) => {
  const id: string = ctx.query.id as string
  const app = await appProps(ctx)
  const data = await fetcher(ctx)
  return {
    props: { id, ...app.props, ...data },
  }
}

export default createPage({
  component,
  requireLogin: true,
  requirePermissions: true,
})
