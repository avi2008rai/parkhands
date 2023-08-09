import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
} from '@material-ui/core'

import { useDomain, Domain } from 'common/i18n'
import { ConfirmHookProps } from 'components/hooks/useConfirm'

export type ConfirmDialogProps = {
  confirmButton?: string
  dialogTitle: string
  dialogContent: React.ReactNode
} & Pick<ConfirmHookProps, 'open' | 'confirmHandler' | 'closeHandler'>

export default function ConfirmDialog({
  open,
  closeHandler,
  confirmHandler,
  confirmButton = 'Confirm',
  dialogTitle,
  dialogContent,
}: ConfirmDialogProps) {
  const t = useDomain(Domain.General)
  return (
    <Dialog
      open={open}
      onClose={closeHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" color="text-primary">
        <Typography component="div">
          <Box fontWeight={600}>{t(dialogTitle)}</Box>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText component="div" id="alert-dialog-description" color="textPrimary">
          {typeof dialogContent === 'string' ? t(dialogContent) : dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} color="secondary">
          {t('cancel')}
        </Button>
        <Button onClick={confirmHandler} color="secondary" autoFocus>
          {t(confirmButton)}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
