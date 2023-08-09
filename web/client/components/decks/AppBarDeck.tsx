import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Search } from '@material-ui/icons'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Grid, Hidden, Box, Fade } from '@material-ui/core'

import routes from 'common/routes'
import MenuIcon from 'components/common/icon/MenuIcon'
import ParkhandsLogo from 'components/common/ParkhandsLogo'
import { useSelectedSlot } from 'components/hooks/useSelectedSlot'
import { useSidekick } from 'components/hooks/useSidekick'
import { useUserContext } from 'components/hooks/useUserContext'
import { useActiveBooking } from 'components/hooks/useActiveBooking'
import ActiveBookingPanel from 'components/bookings/active/ActiveBookingPanel'
import { useMobileSearchVisible } from 'components/hooks/useMobileSearchVisible'
// @Disabled
// import NotActivatedAlert from 'components/alert/NotActivatedAlert'

import FilterDeck from './FilterDeck'
import PublicMenu from './PublicMenu'
import ProfileMenu from './ProfileMenu'
import SearchBox from './search/SearchBox'

const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 10,
      height: '4rem',
      [theme.breakpoints.only('xs')]: {
        height: '3.5rem',
      },
      background:
        'transparent linear-gradient(108deg, #263846 0%, #243542 45%, #22323E 100%) 0% 0% no-repeat padding-box',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    toolboxGrid: {
      marginTop: theme.spacing(0),
      marginLeft: theme.spacing(5),
    },
    logo: {
      marginTop: theme.spacing(1),
    },
  }),
)
type AppBarDeckProps = {
  navMenuToggle: () => void
  showActiveBooking?: boolean
}
export default function AppBarDeck({ navMenuToggle, showActiveBooking = false }: AppBarDeckProps) {
  const classes = useStyles()
  const router = useRouter()
  const { loggedIn } = useUserContext()
  const { primary, secondary, close } = useSidekick()
  const { searchVisible, setSearchVisible } = useMobileSearchVisible()
  const { activeBooking } = useActiveBooking()
  const { clearSelection } = useSelectedSlot()

  useEffect(() => {
    if (primary || secondary) {
      // Avoids Filter Deck and Search Deck to be open at the same time
      setSearchVisible(false)
    }
  }, [primary, secondary])

  const searchHandler = () => {
    close() // Close Side Deck when user opens Search Deck
    // Close Slot Card only when user opens Search Deck, not closes it
    if (!searchVisible) {
      clearSelection()
    }
    if (router.pathname === routes.dashboard) {
      setSearchVisible(!searchVisible)
    } else {
      // Redirect to dashboard so we show the search on top of the map layout
      router.push(routes.dashboard)
    }
  }
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Hidden mdUp>
          <IconButton edge="start" onClick={navMenuToggle} aria-label="navigation menu">
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Link href="/">
          <a>
            <ParkhandsLogo className={classes.logo} />
          </a>
        </Link>
        <Hidden smDown>
          <Grid
            container
            spacing={1}
            wrap="nowrap"
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.toolboxGrid}>
            <Grid item xs={8}>
              <Grid container spacing={2} direction="row" wrap="nowrap">
                <Grid item>
                  <SearchBox />
                </Grid>
                <Grid item>
                  <FilterDeck />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs="auto">
              {loggedIn ? <ProfileMenu /> : <PublicMenu />}
            </Grid>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            edge="end"
            onClick={searchHandler}
            aria-label="destination"
            color={searchVisible ? 'secondary' : 'default'}>
            <Search />
          </IconButton>
        </Hidden>
      </Toolbar>
      {showActiveBooking && <ActiveBookingPanel />}
      <Hidden mdUp>
        <Fade in={searchVisible} timeout={300} mountOnEnter>
          <Grid container spacing={2} justify="space-around">
            <Grid item xs={12}>
              <Box px={3} mt={activeBooking ? 11 : 3}>
                <SearchBox />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box px={3} pb={2} textAlign="center">
                <FilterDeck xs />
              </Box>
            </Grid>
          </Grid>
        </Fade>
      </Hidden>
      {/* @Disabled */}
      {/* {loggedIn && <NotActivatedAlert />} */}
    </AppBar>
  )
}
