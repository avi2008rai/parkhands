import { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import withNextApollo from 'next-with-apollo'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { combineProviders } from 'react-combine-providers'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { ApolloProvider, ApolloClient } from '@apollo/client'

import 'common/i18n'
import theme from 'common/theme'
import RouteIndicator from 'components/layout/RouteIndicator'
import { UserProvider } from 'components/hooks/useUserContext'
import BreadcrumbProvider from 'components/layout/Breadcrumbs/context'
import { apolloClientFactory } from 'common/utils/apolloClient'

const providers = combineProviders()
providers.push(ThemeProvider, { theme, children: null })
providers.push(BreadcrumbProvider)
const MasterProvider = providers.master()

type ParkAppProps = AppProps & { apollo: ApolloClient<{}> }

function ParkAdminApp({ Component, pageProps, apollo }: ParkAppProps) {
  // Remove the server-side injected CSS.
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ApolloProvider client={apollo}>
      <MasterProvider>
        <CssBaseline />
        <RouteIndicator />
        <UserProvider initialUser={pageProps?.serverUser} initialToken={pageProps?.jwtToken}>
          <Component {...pageProps} />
        </UserProvider>
      </MasterProvider>
    </ApolloProvider>
  )
}

export default withNextApollo(({ initialState }) => apolloClientFactory({ initialState }), {
  getDataFromTree,
})(ParkAdminApp)
