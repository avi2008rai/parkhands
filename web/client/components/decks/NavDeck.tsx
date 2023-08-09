import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { SwipeableDrawer, Hidden, IconButton } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Search } from '@material-ui/icons'

import PublicNavMenu from 'components/decks/PublicNavMenu'
import PrivateNavMenu from 'components/decks/PrivateNavMenu'
import { useUserContext } from 'components/hooks/useUserContext'
import CloseModalButton from 'components/common/CloseModalButton'
import routes from 'common/routes'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '&&': {
        // Mobile drawer should be above drawer.zIndex and under modal.zIndex
        zIndex: `${theme.zIndex.drawer + 50} !important`,
      },
    },
    navMenuDrawer: {
      flexShrink: 0,
    },
    navMenuPaper: {
      width: theme.spacing(10) * 3,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        flexShrink: 0,
      },
    },
    searchIcon: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
    },
  }),
)

type NavDeckProps = {
  mobileOpen: boolean
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavDeck({ mobileOpen, setMobileOpen }: NavDeckProps) {
  const classes = useStyles()
  const router = useRouter()
  const { loggedIn } = useUserContext()
  const closeNavMenu = () => setMobileOpen(false)

  // Register route change event handlers
  useEffect(() => {
    router.events.on('routeChangeStart', closeNavMenu)

    return () => {
      router.events.off('routeChangeStart', closeNavMenu)
    }
  }, [])

  const searchHandler = () => router.push(routes.dashboard)

  return (
    <nav className={classes.navMenuDrawer}>
      <Hidden mdUp implementation="css">
        <SwipeableDrawer
          anchor="left"
          open={mobileOpen}
          variant="temporary"
          ModalProps={{ keepMounted: true }}
          onOpen={() => setMobileOpen(true)}
          onClose={closeNavMenu}
          classes={{ root: classes.root, paper: classes.navMenuPaper }}>
          <CloseModalButton edge="start" fontSize="default" onClose={closeNavMenu} />
          <IconButton
            onClick={searchHandler}
            aria-label="destination"
            className={classes.searchIcon}>
            <Search />
          </IconButton>
          {loggedIn ? <PrivateNavMenu /> : <PublicNavMenu />}
        </SwipeableDrawer>
      </Hidden>
    </nav>
  )
}
