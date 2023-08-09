import React from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { Domain } from 'common/i18n/locale'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { minWidth: theme.spacing(12) },
  }),
)

export type ResetButtonProps = Pick<ButtonProps, 'onClick'>

export default function ResetButton({ onClick }: ResetButtonProps) {
  const classes = useStyles()
  const { t } = useTranslation(Domain.General)
  return (
    <Button variant="text" className={classes.root} onClick={onClick}>
      {t('reset')}
    </Button>
  )
}
