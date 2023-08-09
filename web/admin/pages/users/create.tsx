import React from 'react'

import Link from 'components/common/Link'
import createPage from 'common/utils/createPage'
import component, { PageParams } from 'components/users/create/Page'

export { getServerSideProps } from 'common/utils/appParams'

export default createPage<PageParams>({
  component,
  requirePermissions: ({ can }) => can.manageUsers,
  breadcrumbs: ({ routes, t }) => ({
    parents: [
      <Link key="dashboard" color="inherit" href={routes.dashboard}>
        {t('dashboard')}
      </Link>,
      <Link key="users" color="inherit" {...routes.users.index}>
        {t('users')}
      </Link>,
    ],
    current: t('create'),
  }),
})
