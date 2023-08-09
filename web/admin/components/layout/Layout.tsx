import React from 'react'
import Head from 'next/head'
import { Menu } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Drawer, Hidden, Typography, AppBar, Toolbar, IconButton } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'

import useLayoutStyles from './layoutStyles'
import Nav from './Nav'
import Footer from './Footer'
import Header from './Header'

type LayoutProps = {
  title?: string
}

const drawerWidth = 200

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
    },
  }),
)

export default function Layout({
  children,
  title = 'Parkhands Admin',
}: React.PropsWithChildren<LayoutProps>) {
  const classes = useStyles()
  const { t } = useTranslation(Domain.Navigation)
  const layoutClasses = useLayoutStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <div className={classes.root}>
      <Head>
        <title>{t(title)}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}>
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            {t(title)}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            anchor="left"
            open={mobileOpen}
            variant="temporary"
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            classes={{
              paper: classes.drawerPaper,
            }}>
            <Nav />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open>
            <Nav />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Hidden mdUp implementation="css">
          <div className={classes.toolbar} />
        </Hidden>
        <Header />
        <div>
          <div className={layoutClasses.content}>{children}</div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
