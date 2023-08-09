import React from 'react'
import { Button, ButtonProps } from '@material-ui/core'

import routes from './routes'

type BookButtonProps = {
  label?: string
  slotId: string
} & Pick<ButtonProps, 'fullWidth' | 'color' | 'variant' | 'classes'>

export default function BookButton({ slotId, label = 'Book', ...props }: BookButtonProps) {
  return (
    <Button
      href={routes.client.bookSlot(slotId)}
      color="primary"
      variant="contained"
      rel="noopener noreferrer"
      {...props}>
      {label}
    </Button>
  )
}
