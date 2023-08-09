import React from 'react'
import { Link } from '@material-ui/core'

type ExternalLinkParams = React.PropsWithChildren<{ href: string }>

export default function ExternalLink({ href, children }: ExternalLinkParams) {
  return (
    <Link target="_blank" color="secondary" href={href} rel="external nofollow noopener">
      {children || href}
    </Link>
  )
}
