import { useRouter } from 'next/router'
import { useTheme } from '@material-ui/core/styles'
import React, { useCallback, PropsWithChildren } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import {
  Box,
  BoxProps,
  Dialog,
  DialogProps,
  LinearProgress,
  useMediaQuery,
} from '@material-ui/core'

import routes from 'common/routes'

import CloseModalButton, { CloseModalButtonProps } from './CloseModalButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    box: {
      margin: theme.spacing(5, 3, 4),
    },
  }),
)
export type PageDialogProps = PropsWithChildren<
  {
    open?: boolean
    loading?: boolean
    onClose?: () => void
    boxProps?: BoxProps
    closeToDashboard?: boolean
    closeModalButtonProps?: Partial<CloseModalButtonProps>
  } & Partial<DialogProps>
>
export default function PageDialog({
  open = true,
  maxWidth = 'sm',
  onClose,
  loading,
  children,
  boxProps,
  closeToDashboard = false,
  closeModalButtonProps = {},
  disableBackdropClick = true,
  disableEscapeKeyDown = true,
  ...props
}: PageDialogProps) {
  const styles = useStyles()
  const theme = useTheme()
  const router = useRouter()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const closeModal = useCallback(() => {
    if (typeof onClose === 'function') {
      onClose()
    }
    if (closeToDashboard) {
      router.push(routes.dashboard, routes.dashboard)
    }
  }, [closeToDashboard, onClose])

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth={maxWidth}
      onClose={closeModal}
      fullScreen={fullScreen}
      disableBackdropClick={disableBackdropClick}
      disableEscapeKeyDown={disableEscapeKeyDown}
      {...props}>
      <CloseModalButton onClose={closeModal} {...closeModalButtonProps} />
      <Box className={styles.box} textAlign="center" {...boxProps}>
        {loading && <LinearProgress color="secondary" />}
        {children}
      </Box>
    </Dialog>
  )
}
