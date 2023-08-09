import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonProps, CircularProgress, CircularProgressProps } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { Domain } from 'common/i18n/locale'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { minWidth: theme.spacing(12) },
  }),
)

export type SubmitButtonProps = {
  loading?: boolean
  label?: string
  loadingColor?: CircularProgressProps['color']
} & ButtonProps

export default function SubmitButton({
  label = 'Submit',
  loading = false,
  loadingColor,
  ...props
}: SubmitButtonProps) {
  const classes = useStyles()
  const { t } = useTranslation(Domain.Forms)
  const guessColor = props.color === 'primary' ? 'secondary' : 'primary'
  const progressColor = loadingColor ? loadingColor : guessColor
  return (
    <Button
      type="submit"
      color="primary"
      variant="contained"
      disabled={loading}
      className={classes.root}
      {...props}>
      {loading ? <CircularProgress color={progressColor} size="1.5rem" /> : t(label)}
    </Button>
  )
}
