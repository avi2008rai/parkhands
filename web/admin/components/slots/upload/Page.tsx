import React from 'react'
import { Box, Paper, Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import Layout from 'components/layout/Layout'
import { Page } from 'common/utils/appParams'
import UploadDatasetForm from './UploadDatasetForm'
import { useTranslation } from 'react-i18next'
import { Domain } from 'common/i18n/locale'

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      width: '100%',
    },
  }),
)

function UploadDatasetPage() {
  const { t } = useTranslation(Domain.Pages)
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Box p={3}>
        <Grid container alignItems="flex-start" spacing={3}>
          <Grid item lg={8} xs={12}>
            <Typography variant="h5">{t('upload', { ns: Domain.General })}</Typography>
          </Grid>
          <Grid item lg={8} xs={12}>
            <UploadDatasetForm />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default () => (
  <Layout title="Slots">
    <UploadDatasetPage />
  </Layout>
)
