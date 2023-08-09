import React from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

export default function MenuIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19 4H5C4.44772 4 4 4.44772 4 5C4 5.55228 4.44772 6 5 6H19C19.5523 6 20 5.55228 20 5C20 4.44772 19.5523 4 19 4Z" />
      <path d="M19 18H5C4.44772 18 4 18.4477 4 19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18Z" />
      <path d="M15 11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11Z" />
    </SvgIcon>
  )
}
