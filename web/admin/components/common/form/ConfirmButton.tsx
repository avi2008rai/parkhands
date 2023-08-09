import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ButtonProps,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'

import { Domain } from 'common/i18n/locale'
import useConfirm, { ConfirmProps } from 'components/common/hooks/useConfirm'

export type ConfirmButtonProps = {
  buttonIcon: ReactNode
  buttonLabel: string
  buttonProps: ButtonProps
  dialogTitle: string
  dialogContent: string
} & ConfirmProps

export default function ConfirmButton({
  buttonIcon,
  buttonLabel,
  dialogTitle,
  dialogContent,
  buttonProps,
  onConfirm,
  onClose,
}: ConfirmButtonProps) {
  const { loading, open, openHandler, closeHandler, confirmHandler } = useConfirm({
    onConfirm,
    onClose,
  })
  const { t } = useTranslation(Domain.General)
  return (
    <>
      <Button
        type="button"
        variant="contained"
        onClick={openHandler}
        disabled={loading}
        startIcon={loading ? <CircularProgress color="primary" size={16} /> : buttonIcon}
        {...buttonProps}>
        {t(buttonLabel)}
      </Button>
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
          <Button onClick={closeHandler} color="primary">
            {t('cancel')}
          </Button>
          <Button onClick={confirmHandler} color="primary" autoFocus>
            {t('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
