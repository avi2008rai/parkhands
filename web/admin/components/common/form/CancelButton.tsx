import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Button, ButtonProps } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { Domain } from 'common/i18n/locale'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: theme.spacing(12),
      background: 'transparent',
      '&:hover': {
        backgroundColor: 'transparent',
      },
      color: '#ff555d',
    },
  }),
)

export type CancelButtonProps = { href?: string; as?: string } & ButtonProps

export default function CancelButton({ href, as, ...rest }: CancelButtonProps) {
  const router = useRouter()
  const classes = useStyles()
  const { t } = useTranslation(Domain.General)
  const onClick = useCallback(() => href && router.push(href, as), [router, href, as])
  return (
    <Button className={classes.root} onClick={onClick} {...rest}>
      {t('cancel')}
    </Button>
  )
}
