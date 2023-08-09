import React from 'react'

import Link from 'components/common/Link'
import createPage from 'common/utils/createPage'
import component, { PageParams } from 'components/spaces/view/Page'

export { getServerSideProps } from './manage'

export default createPage<PageParams>({
  component,
  requirePermissions: ({ can }) => can.manageSpaces,
  breadcrumbs: ({ routes, props, t }) => ({
    parents: [
      <Link key="dashboard" color="inherit" href={routes.dashboard}>
        {t('dashboard')}
      </Link>,
      <Link key="spaces" color="inherit" {...routes.spaces.index}>
        {t('Spaces')}
      </Link>,
    ],
    current: `${props.parkingSpace?.name}`,
  }),
})
