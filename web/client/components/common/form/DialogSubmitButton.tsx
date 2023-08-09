import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import SubmitButton, { SubmitButtonProps } from './SubmitButton'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cta: {
      height: theme.spacing(6),
      borderRadius: 0,
      flexGrow: 1,
    },
    label: {
      textTransform: 'uppercase',
    },
  }),
)

export type DialogSubmitButtonProps = SubmitButtonProps
export default function DialogSubmitButton(props: DialogSubmitButtonProps) {
  const classes = useStyles()
  return (
    <SubmitButton
      fullWidth
      classes={{
        root: classes.cta,
        label: classes.label,
      }}
      {...props}
    />
  )
}
