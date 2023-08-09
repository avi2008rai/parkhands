import { GetServerSideProps } from 'next'
import createPage from 'common/utils/createPage'
import MapLayout from 'components/layout/MapLayout'
import { getServerSideProps as appProps } from 'common/utils/appParams'
import component, { fetcher, QueryParams, PageParams } from 'components/payment/SubscriptionPage'

export const getServerSideProps: GetServerSideProps<PageParams, QueryParams> = async (ctx) => {
  const app = await appProps(ctx)
  const plan = await fetcher()
  return {
    props: { ...app.props, plan },
  }
}

export default createPage({
  requireLogin: true,
  requirePermissions: true,
  layout: MapLayout,
  component,
})
