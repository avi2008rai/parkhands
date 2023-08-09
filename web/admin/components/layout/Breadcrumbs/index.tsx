import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@material-ui/core'

import { useBreadcrumbs } from './context'
import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
)

export default function Breadcrumbs() {
  const classes = useStyles()
  const { parents, current } = useBreadcrumbs()
const { t } = useTranslation(Domain.Navigation)
  return (
    <div className={classes.root}>
      <MuiBreadcrumbs separator="&rsaquo;" aria-label="breadcrumb">
        {parents}
        <Typography color="inherit" variant="subtitle2">
          {t(current)}
        </Typography>
      </MuiBreadcrumbs>
    </div>
  )
}
