import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, CircularProgress, ButtonProps } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { Domain } from 'common/i18n/locale'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { minWidth: theme.spacing(12) },
  }),
)

export type SubmitButtonProps = { loading?: boolean; label?: string } & ButtonProps

export default function SubmitButton({
  loading = false,
  label = 'Save',
  ...rest
}: SubmitButtonProps) {
  const classes = useStyles()
  const { t } = useTranslation(Domain.General)
  return (
    <Button
      type="submit"
      color="primary"
      variant="contained"
      disabled={loading}
      className={classes.root}
      {...rest}>
      {loading ? <CircularProgress color="primary" size="1.5rem" /> : t(label)}
    </Button>
  )
}
