import { GetServerSideProps } from 'next'

import component, {
  fetcher,
  PageParams,
  QueryParams,
} from 'components/bookings/create/CreateBookingPage'
import MapLayout from 'components/layout/MapLayout'
import createPage from 'common/utils/createPage'
import { getServerSideProps as appProps } from 'common/utils/appParams'

export const getServerSideProps: GetServerSideProps<PageParams, QueryParams> = async (ctx) => {
  const id: string = ctx.query.id as string
  const app = await appProps(ctx)
  const data = await fetcher(ctx, id)
  return {
    props: { id, ...app.props, ...data },
  }
}

export default createPage({
  component,
  layout: MapLayout,
  requireLogin: false,
  requirePermissions: true,
})
