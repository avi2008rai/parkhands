import React from 'react'
import { GetServerSideProps } from 'next'

import Link from 'components/common/Link'
import createPage from 'common/utils/createPage'
import { getServerSideProps as appProps } from 'common/utils/appParams'
import component, { PageParams, QueryParams, fetcher } from 'components/slots/manage/Page'

export const getServerSideProps: GetServerSideProps<PageParams, QueryParams> = async (ctx) => {
  const id: string = ctx.query.id as string
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
