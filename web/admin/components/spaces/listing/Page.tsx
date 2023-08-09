import React from 'react'
import { LinearProgress, Box, Paper, Grid } from '@material-ui/core'

import routes from 'common/routes'
import Layout from 'components/layout/Layout'
import { useUser } from 'components/hooks/useUser'
import SlotsMap from 'components/common/map/SlotsMap'
import CreateItemFab from 'components/common/CreateItemFab'
import UploadDatasetFab from 'components/common/UploadDatasetFab'
import { useSpacesListQuery } from 'gql/schema'

import ListingTable from './ListingTable'

function ListingPage() {
  const { role } = useUser()
  const { data, loading } = useSpacesListQuery()
  if (loading || !data) {
    return <LinearProgress color="secondary" />
  }
  return (
    <Grid container direction="column">
      {role.isSuperAdmin && (
        <Grid item>
          <Grid container direction="row" justify="flex-end">
            <Grid item>
              <UploadDatasetFab {...routes.spaces.upload} />
            </Grid>
            <Grid item>
              <CreateItemFab {...routes.spaces.create} />
            </Grid>
          </Grid>
        </Grid>
      )}
      
      <Grid item>
        <ListingTable {...data} />
      </Grid>
    </Grid>
  )
}

export default () => (
  <Layout title="Spaces">
    <ListingPage />
  </Layout>
)
