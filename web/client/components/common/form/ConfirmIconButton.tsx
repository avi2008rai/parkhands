import React, { ReactNode } from 'react'
import { CircularProgress, IconButton, IconButtonProps } from '@material-ui/core'

import useConfirm, { ConfirmProps } from 'components/hooks/useConfirm'

import ConfirmDialog from './ConfirmDialog'

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
  return (
    <>
      <IconButton title={buttonLabel} disabled={loading} onClick={openHandler} {...buttonProps}>
        {loading ? <CircularProgress color="primary" size={24} /> : buttonIcon}
      </IconButton>
      <ConfirmDialog
        {...{
          open,
          openHandler,
          closeHandler,
          confirmHandler,
          dialogTitle,
          dialogContent,
        }}
      />
    </>
  )
}
