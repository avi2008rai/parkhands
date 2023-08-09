import React from 'react'
import { GetServerSideProps } from 'next'

import Link from 'components/common/Link'
import createPage from 'common/utils/createPage'
import { getServerSideProps as appProps } from 'common/utils/appParams'
import component, { PageParams, fetcher } from 'components/users/manage/Page'

export const getServerSideProps: GetServerSideProps<PageParams> = async (ctx) => {
  const { id } = ctx.query
  const app = await appProps(ctx)
  const data = await fetcher(ctx)
  return {
    props: {
      id,
      ...app.props,
      ...data,
    },
  }
}

export default createPage<PageParams>({
  component,
  requirePermissions: ({ can }) => can.manageUsers,
  breadcrumbs: ({ routes, props, t }) => ({
    parents: [
      <Link key="dashboard" color="inherit" href={routes.dashboard}>
        {t('dashboard')}
      </Link>,
      <Link key="users" color="inherit" {...routes.users.index}>
        {t('users')}
      </Link>,
    ],
    current: `${props.user?.name}`,
  }),
})
