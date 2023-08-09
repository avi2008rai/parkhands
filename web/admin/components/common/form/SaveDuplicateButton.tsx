import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, CircularProgress, ButtonProps } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { Domain } from 'common/i18n/locale'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { minWidth: theme.spacing(12), marginRight: '15px' },
  }),
)

export type SaveDuplicateButtonProps = { loading?: boolean; label?: string; dupicate?: boolean, onClick?: any  } & ButtonProps

export default function SaveDuplicateButton({
  onClick,
  dupicate = true,
  loading = false,
  label = 'Save & Duplicate',
  ...rest
}: SaveDuplicateButtonProps) {
  const classes = useStyles()
  const { t } = useTranslation(Domain.General)
  return (
    <Button
      type="submit"
      color="primary"
      variant="contained"
      disabled={loading}
      name="copy"
      className={classes.root}
      onClick={onClick}
      {...rest}>
      {loading ? <CircularProgress color="primary" size="1.5rem" /> : t(label)}
    </Button>
  )
}