import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

import { Domain } from 'common/i18n'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0, 3),
      margin: theme.spacing(3, 0),
    },
    gdpr: {
      fontSize: theme.typography.pxToRem(10),
    },
  }),
)

const gdprEmail = 'gdpr@parkhands.com'

export default function GdprBox() {
  const classes = useStyles()
  const { t } = useTranslation(Domain.Pages)
  return (
    <Box textAlign="center" className={classes.root}>
      <Typography variant="subtitle2" className={classes.gdpr}>
        {t('contact_us_download_information')}
      </Typography>
      <Typography
        component="a"
        target="_blank"
        color="secondary"
        variant="subtitle2"
        className={classes.gdpr}
        href={`mailto:${gdprEmail}?subject=GDPR Download Data`}>
        {gdprEmail}
      </Typography>
    </Box>
  )
}
