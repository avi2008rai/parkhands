import React from 'react'

import createPage from 'common/utils/createPage'
import Layout from 'components/layout/Layout'
import Link from 'components/common/Link'

import { getServerSideProps } from 'common/utils/appParams'
export { getServerSideProps }

export default createPage({
  requirePermissions: ({ can }) => can.doEverything,
  breadcrumbs: ({ routes, t }) => ({
    parents: [
      <Link key="dashboard" color="inherit" href={routes.dashboard}>
        {t('dashboard')}
      </Link>,
    ],
    current: t('partners'),
  }),
  component: () => (
    <Layout title="Partners">
      <h1>Partners</h1>
    </Layout>
  ),
})
