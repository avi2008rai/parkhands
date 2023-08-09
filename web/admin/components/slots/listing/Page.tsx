import React from 'react'
import { LinearProgress, Box, Paper, Grid } from '@material-ui/core'

import routes from 'common/routes'
import Layout from 'components/layout/Layout'
import { useUser } from 'components/hooks/useUser'
import SlotsMap from 'components/common/map/SlotsMap'
import CreateItemFab from 'components/common/CreateItemFab'
import UploadDatasetFab from 'components/common/UploadDatasetFab'
import { useSlotsListQuery } from 'gql/schema'

import ListingTable from './ListingTable'

function ListingPage() {
  const { role } = useUser()
  const { data, loading } = useSlotsListQuery()
  if (loading || !data) {
    return <LinearProgress color="secondary" />
  }
  return (
    <Grid container direction="column">
      {role.isSuperAdmin && (
        <Grid item>
          <Grid container direction="row" justify="flex-end">
            <Grid item>
              <UploadDatasetFab {...routes.slots.upload} />
            </Grid>
            <Grid item>
              <CreateItemFab {...routes.slots.create} />
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid item>
        <Paper>
          <SlotsMap {...data} />
        </Paper>
      </Grid>
      <Grid item>
        <ListingTable {...data} />
      </Grid>
    </Grid>
  )
}

export default () => (
  <Layout title="Slots">
    <ListingPage />
  </Layout>
)
