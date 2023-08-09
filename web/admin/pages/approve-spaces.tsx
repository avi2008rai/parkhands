import React from 'react'

import createPage from 'common/utils/createPage'
import Link from 'components/common/Link'
import component from 'components/slots/approve-listing/Page'

import { getServerSideProps } from 'common/utils/appParams'
export { getServerSideProps }

export default createPage({
  component,
  requirePermissions: ({ can }) => can.approveSpaces,
  breadcrumbs: ({ routes, t }) => ({
    parents: [
      <Link key="dashboard" color="inherit" href={routes.dashboard}>
        {t('dashboard')}
      </Link>,
    ],
    current: t('Approve Slots'),
  }),
})
