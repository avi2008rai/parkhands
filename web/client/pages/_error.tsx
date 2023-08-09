import { NextPageContext } from 'next'
import { ErrorProps } from 'next/error'

import createPage from 'common/utils/createPage'
import ErrorPage from 'components/error/ErrorPage'

export default createPage<ErrorProps>({
  requireLogin: false,
  requirePermissions: false,
  getInitialProps: ({ res, err }: NextPageContext): Promise<ErrorProps> | ErrorProps => {
    if (res?.statusCode) {
      return { statusCode: res.statusCode }
    }
    if (err?.statusCode) {
      return { statusCode: err.statusCode }
    }
    return { statusCode: 404 }
  },
  component: ErrorPage,
})
