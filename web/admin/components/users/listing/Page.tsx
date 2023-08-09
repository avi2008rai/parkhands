import React from 'react'
import { LinearProgress, Box, Grid } from '@material-ui/core'

import routes from 'common/routes'
import Layout from 'components/layout/Layout'
import CreateItemFab from 'components/common/CreateItemFab'
import { useUsersListQuery } from 'gql/schema'

import ListingTable from './ListingTable'

function ListingPage() {
  const { data, loading } = useUsersListQuery()
  if (loading || !data) {
    return <LinearProgress color="secondary" />
  }
  return (
    <Grid container direction="column">
      <Grid item>
        <Box display="flex" justifyContent="flex-end">
          <CreateItemFab {...routes.users.create} />
        </Box>
      </Grid>
      <Grid item>
        <ListingTable {...data} />
      </Grid>
    </Grid>
  )
}

export default () => (
  <Layout title="Users">
    <ListingPage />
  </Layout>
)
