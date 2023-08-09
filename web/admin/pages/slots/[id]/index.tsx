import React from 'react'

import Link from 'components/common/Link'
import createPage from 'common/utils/createPage'
import component, { PageParams } from 'components/slots/view/Page'

export { getServerSideProps } from './manage'

export default createPage<PageParams>({
  component,
  requirePermissions: ({ can }) => can.manageSlots,
  breadcrumbs: ({ routes, props, t }) => ({
    parents: [
      <Link key="dashboard" color="inherit" href={routes.dashboard}>
        {t('dashboard')}
      </Link>,
      <Link key="slots" color="inherit" {...routes.slots.index}>
        {t('slots')}
      </Link>,
    ],
    current: `${props.slot?.name}`,
  }),
})
