import dynamic from 'next/dynamic'
import { NextPage, NextPageContext } from 'next'
import { useApolloClient } from '@apollo/client'
import React, { ReactElement, PropsWithChildren, useEffect, useState } from 'react'

import { CurrentUser } from 'gql/utils'
import { LayoutProps } from 'components/layout'
import { AppParams } from 'common/utils/appParams'
import BaseLayout from 'components/layout/BaseLayout'
import { usePageProps } from 'components/hooks/usePageProps'

import { apolloLink } from './apolloClient'

type PageProps<P> = {
  component: NextPage<P>
  sendAuthHeader?: AuthHeader
  layout?: (props: PropsWithChildren<LayoutProps>) => ReactElement
  getInitialProps?: ({ res, err }: NextPageContext) => Promise<P> | P
  requireLogin?: boolean
  requirePermissions?: boolean | (() => boolean)
}
type AuthHeader = (params: {
  requireLogin: boolean
  serverUser: CurrentUser | undefined
}) => boolean
export default function createPage<P>({
  requireLogin = true,
  layout = BaseLayout,
  sendAuthHeader = ({ requireLogin, serverUser }) => requireLogin || !!serverUser,
  getInitialProps,
  component: Component,
}: PageProps<P>) {
  const Page = (props: AppParams & P) => {
    const { jwtToken, serverUser } = props
    const client = useApolloClient()
    const { setInitialProps } = usePageProps()
    const [apolloLinkUpdated, setApolloLinkUpdated] = useState(false)

    useEffect(() => {
      // Synchronize props with PagePropsContext
      setInitialProps(props)
    }, [props])

    // Create a new apollo link according to authentication requirements of the page
    useEffect(() => {
      const link = apolloLink({
        jwtToken,
        sendAuthHeader: sendAuthHeader({ requireLogin, serverUser }),
      })
      client.setLink(link)
      setApolloLinkUpdated(true)
    }, [client, jwtToken, requireLogin, sendAuthHeader])

    // Render login page if page requests user to be logged in
    if (requireLogin && !serverUser) {
      const LoginPage = dynamic(() => import('components/auth/login/LoginPage'))
      return <LoginPage />
    }

    // Render the page component when the apollo link has been recreated
    // according to the page requirements.
    // This guarantees that all apollo requests will have the correct link.
    if (apolloLinkUpdated) {
      return <Component {...props} />
    }
    return null
  }

  Page.layout = layout

  // Attach page initial props method if any
  if (getInitialProps) {
    Page.getInitialProps = getInitialProps
  }
  return Page
}
