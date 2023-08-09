import cn from 'classnames'
import React from 'react'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import Div100vh from 'react-div-100vh'

import { Domain } from 'common/i18n/locale'
import NavDeck from 'components/decks/NavDeck'
import AsideDeck from 'components/decks/AsideDeck'
import AppBarDeck from 'components/decks/AppBarDeck'
import SlotClustersMap from 'components/slots/map/SlotClustersMap'
import LoadGoogleMaps from 'components/google-maps/LoadGoogleMaps'

import { LayoutProps } from '.'
import Footer from './Footer'
import useStyles from './layoutStyles'

export default function MapLayout({
  children,
  title = 'Parkhands',
}: React.PropsWithChildren<LayoutProps>) {
  const classes = useStyles({ gutter: false })
  const { t } = useTranslation(Domain.Navigation)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const navMenuToggle = () => setMobileOpen(!mobileOpen)

  return (
    <Div100vh className={classes.root}>
      <Head>
        <title>{t(title)}</title>
      </Head>
      <LoadGoogleMaps>
        <AppBarDeck showActiveBooking navMenuToggle={navMenuToggle} />
        <NavDeck mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <AsideDeck />
        <main className={classes.container}>
          <div className={classes.toolbar} />
          <div className={classes.content}>
            <SlotClustersMap />
            <div className={cn(classes.absoluteContent, classes.disablePointerEvents)}>
              <div className={classes.enablePointerEvents}>{children}</div>
            </div>
          </div>
          <Footer />
        </main>
      </LoadGoogleMaps>
    </Div100vh>
  )
}
