import React, { useState } from 'react'
import { Add } from '@material-ui/icons'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Zoom, Fab, FabProps, Menu, MenuProps, SvgIconProps } from '@material-ui/core'

import theme from 'common/theme'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      '& .MuiMenuItem-root:not(.Mui-disabled)': {
        color: theme.palette.secondary.main,
      },
    },
  }),
)

const transitionDuration = {
  enter: theme.transitions.duration.enteringScreen,
  exit: theme.transitions.duration.leavingScreen,
}

type FabMenuProps = React.PropsWithChildren<{
  fabProps?: Partial<FabProps>
  menuProps?: Partial<MenuProps>
  svgIconProps?: Partial<SvgIconProps>
}>
export default function FabMenu({
  fabProps,
  menuProps,
  children,
  svgIconProps = { color: 'secondary' },
}: FabMenuProps) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)
  const open = Boolean(anchorEl)
  const style = { transitionDelay: `${transitionDuration.exit}ms` }
  return (
    <div>
      <Zoom in unmountOnExit timeout={transitionDuration} style={style}>
        <Fab
          color="primary"
          role="navigation"
          aria-label="FabMenu"
          onClick={handleClick}
          {...fabProps}>
          <Add {...svgIconProps} />
        </Fab>
      </Zoom>
      <Menu
        autoFocus
        open={open}
        keepMounted
        id="fab-menu"
        anchorEl={anchorEl}
        onClick={handleClose}
        onClose={handleClose}
        className={classes.menu}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        {...menuProps}>
        {children}
      </Menu>
    </div>
  )
}
