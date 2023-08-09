import React from 'react'
import { Grow, GrowProps } from '@material-ui/core'
import { Alert, AlertProps } from '@material-ui/lab'

type FormAlertProps = React.PropsWithChildren<{
  show: boolean
  growProps?: GrowProps
  alertProps?: AlertProps
}>

export default function FormAlert({ show, children, growProps, alertProps }: FormAlertProps) {
  return (
    <Grow in={show} {...growProps} mountOnEnter unmountOnExit>
      <Alert {...alertProps}>{children}</Alert>
    </Grow>
  )
}
