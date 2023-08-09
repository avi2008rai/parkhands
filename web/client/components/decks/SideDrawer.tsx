import React, { useCallback } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Drawer, Box, DrawerProps } from '@material-ui/core'

import BackButton from 'components/common/BackButton'
import { useSidekick, Deck } from 'components/hooks/useSidekick'

type StyleProps = { fullWidth: boolean }
export const deck = { xs: '88vw', sm: '35vw', md: '25vw' }
export const calcXsWidth = ({ fullWidth }: StyleProps) => (fullWidth ? '100vw' : deck.xs)

const useStyles = makeStyles((theme: Theme) => {
  const level = {
    primary: theme.zIndex.drawer,
    under: theme.zIndex.drawer - 1,
    above: theme.zIndex.drawer + 1,
  }

  return createStyles({
    root: {
      width: '100%',
    },
    primary: {
      zIndex: level.primary,
      marginTop: theme.mixins.toolbar.minHeight,
      padding: theme.spacing(2, 0),
      [theme.breakpoints.only('xs')]: {
        width: calcXsWidth,
      },
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3, 0),
        width: deck.sm,
      },
      [theme.breakpoints.up('md')]: {
        width: deck.md,
      },
      '& .CallToActionButton': {
        right: 0,
        left: 0,
        [theme.breakpoints.only('xs')]: {
          width: '100vw',
        },
        [theme.breakpoints.up('sm')]: {
          width: deck.sm,
        },
        [theme.breakpoints.up('md')]: {
          width: deck.md,
        },
      },
    },
    secondary: {
      marginTop: theme.mixins.toolbar.minHeight,
      padding: theme.spacing(2, 0),
      zIndex: level.above,
      marginLeft: 0,
      [theme.breakpoints.only('xs')]: {
        width: calcXsWidth,
      },
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3, 0),
        zIndex: level.under,
        width: deck.sm,
        marginLeft: deck.sm,
      },
      [theme.breakpoints.up('md')]: {
        zIndex: level.under,
        width: deck.md,
        marginLeft: deck.md,
      },
      '& .CallToActionButton': {
        right: 0,
        left: 0,
        [theme.breakpoints.only('xs')]: {
          width: '100vw',
        },
        [theme.breakpoints.up('sm')]: {
          left: deck.sm,
          width: deck.sm,
        },
        [theme.breakpoints.up('md')]: {
          left: deck.md,
          width: deck.md,
        },
      },
    },
  })
})

export type SideDrawerProps = React.PropsWithChildren<DrawerProps> & {
  deck: Deck
  hideTopCloseBar?: boolean
  fullWidth?: boolean
  onClose?: () => void
}
export function SideDrawer({
  deck = 'primary',
  hideTopCloseBar = false,
  fullWidth = true,
  onClose,
  children,
  ...drawerProps
}: SideDrawerProps) {
  const classes = useStyles({ fullWidth })
  const { primary, secondary, close } = useSidekick()
  const closeHandler = useCallback(() => {
    close(deck)
    if (typeof onClose === 'function') {
      onClose()
    }
  }, [close, onClose, deck])

  return (
    <Drawer
      anchor="left"
      variant="persistent"
      open={deck === 'primary' ? !!primary : !!secondary}
      onClose={closeHandler}
      classes={{ paper: classes[deck] }}
      {...drawerProps}>
      <Box className={classes.root}>
        {!hideTopCloseBar && (
          <Box textAlign="right">
            <BackButton
              spacing={[0, 2, 1]}
              edge="end"
              position="relative"
              fontSize="small"
              onClick={closeHandler}
            />
          </Box>
        )}
        {children}
      </Box>
    </Drawer>
  )
}
