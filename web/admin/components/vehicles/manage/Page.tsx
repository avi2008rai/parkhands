import React from 'react'
import Error from 'next/error'
import { Paper, Typography, Grid, Box } from '@material-ui/core'

import Layout from 'components/layout/Layout'
import { Page, SSPContext } from 'common/utils/appParams'
import { apolloClientFromCtx } from 'common/utils/apolloClient'
import { ManageVehicleQuery, ManageVehicleDocument } from 'gql/schema'

import Form from './Form'
import useStyles from '../styles'
import { useRouter } from 'next/router'
import routes from 'common/routes'
import { useDomain } from 'common/i18n'
import { Domain } from 'common/i18n/locale'

const t = useDomain(Domain.Pages)

type QueryParams = { id: string | string[] }
export type PageParams = Page<QueryParams, ManageVehicleQuery>

export const fetcher = async (ctx: SSPContext) => {
  
  try {
    const client = apolloClientFromCtx(ctx)
    const { id } = ctx.query
    const { data } = await client.query<ManageVehicleQuery>({
      query: ManageVehicleDocument,
      variables: { id },
    })
    return data
  } catch (error) {
    console.error({ error })
  }
}

function ManageVehiclePage({ vehicle }: PageParams) {
  const router = useRouter()
  const classes = useStyles()
  if (!vehicle) {
    return <Error statusCode={404} title="Vehicle not found" />
  }
  const onUpdated = () => {
    const { href, as } = routes.vehicles.index
    router.push(href, as)
  }
  return (
    <Grid container alignItems="flex-start">
      <Grid item lg={8} xs={12}>
        <Paper className={classes.paper}>
          <Box p={3} className={classes.leftColumn}>
            <Form vehicle={vehicle} onUpdated={onUpdated} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default (params: PageParams) => (
  <Layout title="Vehicles">
    <Typography variant="h2" paragraph>
      {t('vehicle')}{params.vehicle?.name}
    </Typography>
    <ManageVehiclePage {...params} />
  </Layout>
)
