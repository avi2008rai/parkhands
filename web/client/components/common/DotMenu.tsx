import React, { PropsWithChildren } from 'react'
import { MoreVert } from '@material-ui/icons'
import { IconButton, Menu, IconButtonProps } from '@material-ui/core'

export { MenuItem } from '@material-ui/core'

type PageDialogProps = PropsWithChildren<{
  buttonProps?: IconButtonProps
}>
export default function DotMenu({ buttonProps, children }: PageDialogProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <IconButton
        edge="end"
        aria-label="more"
        aria-haspopup="true"
        onClick={handleClick}
        aria-controls="dot-menu"
        {...buttonProps}>
        <MoreVert />
      </IconButton>
      <Menu
        keepMounted
        id="dot-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        {children}
      </Menu>
    </>
  )
}
