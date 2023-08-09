import React from 'react'
import { Box, Paper, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { ManageSpaceQuery } from 'gql/schema'
import Layout from 'components/layout/Layout'
import { Page } from 'common/utils/appParams'

type QueryParams = { id: string | string[] }
export type PageParams = Page<QueryParams, ManageSpaceQuery>

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      width: '100%',
    },
  }),
)

function ViewSlotPage({ id }: PageParams) {
  const classes = useStyles()
  console.log({ id })
  return (
    <Grid container className={classes.root} alignItems="flex-start" spacing={3}>
      <Grid item lg={8} xs={12}>
        <Paper className={classes.paper}>
          <Box p={3}>Slot info will be here</Box>
        </Paper>
      </Grid>
      <Grid item lg={8} xs={12}>
        <Paper className={classes.paper}>
          <Box p={3}>Map will be here</Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default (params: PageParams) => (
  <Layout title="Spaces">
    <ViewSlotPage {...params} />
  </Layout>
)
