import React from 'react'
import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(0.5),
      top: theme.spacing(0.5),
    },
  }),
)

type CloseModalButtonProps = {
  onClose: () => void
}

export default function CloseModalButton({ onClose }: CloseModalButtonProps) {
  const classes = useStyles()
  return (
    <IconButton onClick={() => onClose()} className={classes.closeButton} color="primary">
      <Close fontSize="small" />
    </IconButton>
  )
}
