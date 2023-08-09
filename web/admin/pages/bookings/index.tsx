import React from 'react'

import Link from 'components/common/Link'
import createPage from 'common/utils/createPage'
import component from 'components/bookings/listing/Page'

import { getServerSideProps } from 'common/utils/appParams'
export { getServerSideProps }

export default createPage({
  component,
  requirePermissions: ({ can }) => can.manageBookings,
  breadcrumbs: ({ routes, t }) => ({
    parents: [
      <Link key="dashboard" color="inherit" href={routes.dashboard}>
        {t('dashboard')}
      </Link>,
    ],
    current: t('bookings'),
  }),
})
