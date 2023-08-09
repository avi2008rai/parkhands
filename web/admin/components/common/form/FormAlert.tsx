import React from 'react'
import { Grow } from '@material-ui/core'
import { Alert, AlertProps } from '@material-ui/lab'

type FormAlertProps = React.PropsWithChildren<{
  show: boolean
  alertProps: AlertProps
}>

export default function FormAlert({ show, children, alertProps }: FormAlertProps) {
  return (
    <Grow in={show}>
      <Alert {...alertProps}>{children}</Alert>
    </Grow>
  )
}
