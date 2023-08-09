import React from 'react'
import { LinearProgress, Paper, Grid } from '@material-ui/core'

import Layout from 'components/layout/Layout'
import SlotsMap from 'components/common/map/SlotsMap'
import { useSpacesListQuery } from 'gql/schema'

import ListingTable from './ListingTable'

function ListingPage() {
  const { data, loading } = useSpacesListQuery()
  if (loading || !data) {
    return <LinearProgress color="secondary" />
  }
  return (
    <Grid container direction="column">
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
