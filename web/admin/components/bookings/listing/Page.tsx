import React from 'react'
import { LinearProgress, Grid } from '@material-ui/core'

import Layout from 'components/layout/Layout'
import { useBookingsListQuery } from 'gql/schema'

import ListingTable from './ListingTable'

function ListingPage() {
  const { data, loading } = useBookingsListQuery()
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
  <Layout title="Bookings">
    <ListingPage />
  </Layout>
)
