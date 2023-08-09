import React from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

export default function CheckmarkIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} width="200" height="200" viewBox="0 0 200 200">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100.5 188C149.377 188 189 148.377 189 99.5C189 89.1995 187.24 79.31 184.005 70.1158L105.748 148.373C104.564 149.557 103.241 150.516 101.832 151.251C95.5992 155.542 87.0018 154.916 81.4592 149.373L45.3967 113.311C39.1483 107.062 39.1483 96.9317 45.3967 90.6833C51.6451 84.4349 61.7757 84.4349 68.0241 90.6833L93.1034 115.763L167.356 41.5103C151.129 22.8193 127.195 11 100.5 11C51.6228 11 12 50.6228 12 99.5C12 148.377 51.6228 188 100.5 188Z"
      />
    </SvgIcon>
  )
}
