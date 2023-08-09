import React from 'react'
import { LinearProgress, Paper, Grid } from '@material-ui/core'

import Layout from 'components/layout/Layout'
import SlotsMap from 'components/common/map/SlotsMap'
import { useSlotsListQuery } from 'gql/schema'

import ListingTable from './ListingTable'

function ListingPage() {
  const { data, loading } = useSlotsListQuery()
  if (loading || !data) {
    return <LinearProgress color="secondary" />
  }
  return (
    <Grid container direction="column">
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
