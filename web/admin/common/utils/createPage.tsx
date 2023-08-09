import dynamic from 'next/dynamic'
import { NextPage, NextPageContext } from 'next'
import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'

import i18n from 'common/i18n'
import { CurrentUser } from 'gql/utils'
import {
  useBreadcrumbs,
  BreadcrumbConfig,
  BreadcrumbsFactory,
} from 'components/layout/Breadcrumbs/context'
import { AppParams } from 'common/utils/appParams'
import { useUser, UserCan } from 'components/hooks/useUser'
import { useUserContext } from 'components/hooks/useUserContext'

import { apolloLink } from './apolloClient'

type PageProps<P> = {
  component: NextPage<P>
  sendAuthHeader?: AuthHeader
  getInitialProps?: ({ res, err }: NextPageContext) => Promise<P> | P
  requireLogin?: boolean
  requirePermissions?: ({ can }: { can: UserCan }) => boolean
  breadcrumbs?: BreadcrumbConfig<P>
}
type AuthHeader = (params: {
  requireLogin: boolean
  serverUser: CurrentUser | undefined
}) => boolean
export default function createPage<P>({
  requireLogin = true,
  requirePermissions = () => true,
  getInitialProps,
  breadcrumbs,
  sendAuthHeader = ({ requireLogin, serverUser }) => requireLogin || !!serverUser,
  component: Component,
}: PageProps<P>) {
  const Page = (props: AppParams & P) => {
    const { loggedIn, jwtToken, currentUser } = useUserContext()
    const { can } = useUser()

    // Render login page if page requests user to be logged in
    if (requireLogin && !loggedIn) {
      const LoginPage = dynamic(() => import('components/auth/login/LoginPage'))
      return <LoginPage />
    }

    // Ensure access to admin app is granted
    if (requireLogin && loggedIn && !can.useAdmin) {
      const RestrictedPage = dynamic(() => import('components/auth/restricted/RestrictedPage'))
      return <RestrictedPage />
    }

    // Ensure specific access to certain page
    if (!requirePermissions({ can })) {
      const RestrictedPage = dynamic(() => import('components/auth/restricted/RestrictedPage'))
      return <RestrictedPage />
    }

    const client = useApolloClient()
    const [apolloLinkUpdated, setApolloLinkUpdated] = useState(false)

    // Create a new apollo link according to authentication requirements of the page
    useEffect(() => {
      const link = apolloLink({
        jwtToken,
        sendAuthHeader: sendAuthHeader({ requireLogin, serverUser: currentUser }),
      })
      client.setLink(link)
      setApolloLinkUpdated(true)
    }, [client, jwtToken, requireLogin, sendAuthHeader])

    // Initialize page breadcrumb path
    const { setCurrent, setParents, t } = useBreadcrumbs()
    const { current, parents } = BreadcrumbsFactory<P>(props, t, breadcrumbs)
    useEffect(() => {
      setCurrent(current)
      setParents(parents)
    }, [breadcrumbs, i18n.language])

    // Render the page component when the apollo link has been recreated
    // according to the page requirements.
    // This guarantees that all apollo requests will have the correct link.
    if (apolloLinkUpdated) {
      return <Component {...props} />
    }
    return null
  }

  // Attach page initial props method if any
  if (getInitialProps) {
    Page.getInitialProps = getInitialProps
  }
  return Page
}
