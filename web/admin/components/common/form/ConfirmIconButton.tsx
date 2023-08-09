import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  IconButtonProps,
} from '@material-ui/core'

import { Domain } from 'common/i18n/locale'
import useConfirm, { ConfirmProps } from 'components/common/hooks/useConfirm'

export type ConfirmIconButtonProps = {
  buttonIcon: ReactNode
  buttonLabel: string
  buttonProps: IconButtonProps
  dialogTitle: string
  dialogContent: string
} & ConfirmProps

export default function ConfirmIconButton({
  buttonIcon,
  buttonLabel,
  dialogTitle,
  dialogContent,
  buttonProps,
  onConfirm,
  onClose,
}: ConfirmIconButtonProps) {
  const { loading, open, openHandler, closeHandler, confirmHandler } = useConfirm({
    onConfirm,
    onClose,
  })
  const { t } = useTranslation(Domain.General)
  return (
    <>
      <IconButton title={buttonLabel} disabled={loading} onClick={openHandler} {...buttonProps}>
        {loading ? <CircularProgress color="primary" size={24} /> : buttonIcon}
      </IconButton>
      <Dialog
        open={open}
        onClose={closeHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{t(dialogTitle)}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{t(dialogContent)}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler} color="secondary">
            {t('cancel')}
          </Button>
          <Button onClick={confirmHandler} color="secondary" autoFocus>
            {t('Confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
