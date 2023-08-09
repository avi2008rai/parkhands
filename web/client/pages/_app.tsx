import withNextApollo from 'next-with-apollo'
import { CssBaseline } from '@material-ui/core'
import React, { useEffect } from 'react'
import App, { AppProps, AppContext } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import { combineProviders } from 'react-combine-providers'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { ApolloProvider, ApolloClient } from '@apollo/client'

import 'common/i18n'
import theme from 'common/theme'
import BaseLayout from 'components/layout/BaseLayout'
import { SlotsProvider } from 'components/hooks/useSlots'
import { FiltersProvider } from 'components/hooks/useFilters'
import RouteIndicator from 'components/layout/RouteIndicator'
import { UserProvider } from 'components/hooks/useUserContext'
import { SidekickProvider } from 'components/hooks/useSidekick'
import { apolloClientFactory } from 'common/utils/apolloClient'
import { MapCenterProvider } from 'components/hooks/useMapCenter'
import { PagePropsProvider } from 'components/hooks/usePageProps'
import { SelectedSlotProvider } from 'components/hooks/useSelectedSlot'
import { SelectedSpaceProvider } from 'components/hooks/useSelectedSpace'
import { SearchResultProvider } from 'components/hooks/useSearchResult'
import { ActiveBookingProvider } from 'components/hooks/useActiveBooking'
import { BookingProvider } from 'components/hooks/useBooking'
import { GoogleMapsLoadingProvider } from 'components/hooks/useGoogleMapsLoading'
import { GoogleMapsInstanceProvider } from 'components/hooks/useGoogleMapsInstance'
import { MobileSearchVisibleProvider } from 'components/hooks/useMobileSearchVisible'

// Generic context providers
const providers = combineProviders()
providers.push(PagePropsProvider)
providers.push(ThemeProvider, { theme, children: null })
providers.push(GoogleMapsInstanceProvider)
providers.push(MapCenterProvider)
providers.push(SidekickProvider)
providers.push(FiltersProvider)
providers.push(SlotsProvider)
providers.push(SelectedSlotProvider)
providers.push(SelectedSpaceProvider)
providers.push(GoogleMapsLoadingProvider)
providers.push(SearchResultProvider)
providers.push(MobileSearchVisibleProvider)
providers.push(BookingProvider)
const MasterProvider = providers.master()

// Providers that use user context
const authProviders = combineProviders()
authProviders.push(ActiveBookingProvider)
const MasterAuthenticatedProvider = authProviders.master()

type ParkAppProps = AppProps & { apollo: ApolloClient<{}> }

function ParkClientApp({ Component, pageProps, apollo }: ParkAppProps) {
  // Remove the server-side injected CSS.
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  // @ts-ignore TS2339
  const PageLayout = Component.layout || BaseLayout

  return (
    <ApolloProvider client={apollo}>
      <MasterProvider>
        <CssBaseline />
        <RouteIndicator />
        <UserProvider initialUser={pageProps?.serverUser} initialToken={pageProps?.jwtToken}>
          <MasterAuthenticatedProvider>
            <PageLayout>
              <Component {...pageProps} />
            </PageLayout>
          </MasterAuthenticatedProvider>
        </UserProvider>
      </MasterProvider>
    </ApolloProvider>
  )
}

ParkClientApp.getInitialProps = async (appContext: AppContext) => {
  // AppContext
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default withNextApollo(({ initialState }) => apolloClientFactory({ initialState }), {
  getDataFromTree,
})(ParkClientApp as any)
