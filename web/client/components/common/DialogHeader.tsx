import _ from 'lodash'
import React from 'react'
import { Typography, Paper } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import { Domain } from 'common/i18n/locale'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'relative', // for the absolutely positioned buttons
    },
    title: { padding: theme.spacing(1.5) },
  }),
)

type DialogHeaderProps = {
  title?: string
}
export default function DialogHeader({ title }: DialogHeaderProps) {
  const classes = useStyles()
  const { t } = useTranslation(Domain.Forms)

  return (
    <Paper className={classes.root}>
      {title && (
        <Typography variant="subtitle2" align="center" className={classes.title}>
          {t(title)}
        </Typography>
      )}
    </Paper>
  )
}
