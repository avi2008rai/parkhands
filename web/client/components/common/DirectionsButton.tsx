import React from 'react'
import { Button, ButtonProps } from '@material-ui/core'

import { useDirectionsLink, DirectionsLinkProps } from 'components/hooks/useDirectionsLink'

type DirectionsButtonProps = DirectionsLinkProps & {
  label?: string
} & Pick<ButtonProps, 'fullWidth' | 'color' | 'variant' | 'classes' | 'startIcon'>

export default function DirectionsButton({
  start,
  destination,
  label = 'Navigation',
  useBrowserPosition = false,
  ...props
}: DirectionsButtonProps) {
  const { href } = useDirectionsLink({ start, destination, useBrowserPosition })
  return (
    <Button
      href={href}
      color="primary"
      target="_blank"
      variant="contained"
      rel="noopener noreferrer"
      {...props}>
      {label}
    </Button>
  )
}
