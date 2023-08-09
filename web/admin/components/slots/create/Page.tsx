import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Paper, Typography, Grid, Box } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'
import routes from 'common/routes'
import Layout from 'components/layout/Layout'
import { useUser } from 'components/hooks/useUser'

import SlotForm from '../SlotForm'
import useStyles from '../styles'

function CreateSlotPage() {
  const router = useRouter()
  const classes = useStyles()
  const { userId } = useUser()
  const { t } = useTranslation(Domain.Pages)

  const onCreated = () => {
    const { href, as } = routes.slots.index
    router.push(href, as)
  }
  return (
    <div>
      <Grid container alignItems="flex-start">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Box p={3} className={classes.leftColumn}>
              <SlotForm onFormSuccess={onCreated} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default () => (
  <Layout title="Slots">
    <CreateSlotPage />
  </Layout>
)
