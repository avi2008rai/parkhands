import React from 'react'
import { Snackbar, SnackbarProps } from '@material-ui/core'
import { Alert, AlertProps } from '@material-ui/lab'

type SnackbarAlertProps = React.PropsWithChildren<{
  show: boolean
  snackbarProps?: SnackbarProps
  alertProps?: AlertProps
}>

export default function SnackbarAlert({
  show,
  children,
  snackbarProps,
  alertProps,
}: SnackbarAlertProps) {
  return (
    <Snackbar open={show} {...snackbarProps}>
      <Alert {...alertProps}>{children}</Alert>
    </Snackbar>
  )
}
