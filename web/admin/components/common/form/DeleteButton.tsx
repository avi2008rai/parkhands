import _ from 'lodash'
import React, { useState } from 'react'
import { Delete } from '@material-ui/icons'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'
import ConfirmIconButton from './ConfirmIconButton'
import { Snackbar, Grow } from '@material-ui/core'
import { Alert, Color } from '@material-ui/lab'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:hover': {
        color: theme.palette.error.main,
      },
    },
  }),
)

export type DeleteButtonProps = {
  dialogTitle?: string
  dialogContent?: string
  successMessage?: string
  buttonLabel?: string
  onConfirm?: () => void | Promise<void>
  onClose?: () => void | Promise<void>
}

export default function DeleteButton({
  onConfirm,
  onClose,
  buttonLabel = 'delete',
  successMessage = 'success',
  dialogTitle = 'delete_item',
  dialogContent = 'confirm_delete_item',
}: DeleteButtonProps) {
  const classes = useStyles()
  const { t } = useTranslation(Domain.General)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alert, setAlert] = useState<string>('')
  const [severity, setSeverity] = useState<Color>('success')

  const confirmHandler = async () => {
    try {
      if (typeof onConfirm === 'function') {
        await onConfirm()
      }
      setShowAlert(true)
      setAlert(t(successMessage))
      setSeverity('success')
    } catch (error) {
      setShowAlert(true)
      setAlert(_.get(error, 'graphQLErrors[0].message'))
      setSeverity('error')
    }
  }
  const closeHandler = async () => {
    if (typeof onClose === 'function') {
      await onClose()
    }
    setShowAlert(false)
  }
  const closeAlertHandler = async () => {
    setShowAlert(false)
  }

  return (
    <>
      <ConfirmIconButton
        onClose={closeHandler}
        onConfirm={confirmHandler}
        dialogTitle={dialogTitle}
        dialogContent={dialogContent}
        buttonIcon={<Delete />}
        buttonLabel={buttonLabel}
        buttonProps={{
          className: classes.root,
        }}
      />
      <Snackbar open={showAlert} autoHideDuration={6000} onClose={closeAlertHandler}>
        <Grow in={showAlert}>
          <Alert onClose={closeAlertHandler} severity={severity}>
            {alert}
          </Alert>
        </Grow>
      </Snackbar>
    </>
  )
}
