import React from 'react'
import { Box } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

import ActionDialog, { ActionDialogProps } from 'components/common/ActionDialog'
import DialogSubmitButton from 'components/common/form/DialogSubmitButton'

import TermsOfService from './TermsOfService'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    terms: {
      overflow: 'auto',
      textAlign: 'left',
      paddingTop: theme.spacing(2),
      [theme.breakpoints.only('xs')]: {
        maxHeight: '85vh',
      },
      [theme.breakpoints.up('sm')]: {
        maxHeight: '70vh',
        overflowY: 'scroll',
        paddingBottom: theme.spacing(5),
      },
    },
    button: {
      [theme.breakpoints.only('xs')]: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
  }),
)

type TermsDialogProps = {
  buttonLabel?: string
  onClose?: () => void
  onAccept?: () => void
} & ActionDialogProps

export default function TermsDialog({
  buttonLabel = 'i_accept',
  onClose,
  onAccept,
  ...props
}: TermsDialogProps) {
  const classes = useStyles()
  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose()
    }
  }
  const handleButton = () => {
    if (typeof onAccept === 'function') {
      onAccept()
    } else if (typeof onClose === 'function') {
      onClose()
    }
  }
  return (
    <ActionDialog flex maxWidth="md" headerLabel="Terms" {...props} onClose={handleClose}>
      <Box flexGrow={12} px={3} className={classes.terms}>
        <TermsOfService />
      </Box>
      <DialogSubmitButton
        className={classes.button}
        onClick={handleButton}
        label={buttonLabel}
        color="secondary"
      />
    </ActionDialog>
  )
}
