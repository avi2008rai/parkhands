import React from 'react'
import Error from 'next/error'
import { Paper, Typography, Grid, Box } from '@material-ui/core'

import Layout from 'components/layout/Layout'
import { Page, SSPContext } from 'common/utils/appParams'
import { apolloClientFromCtx } from 'common/utils/apolloClient'
import { ManageSlotQuery, ManageSlotDocument } from 'gql/schema'

import SlotForm from '../SlotForm'
import useStyles from '../styles'
import { useRouter } from 'next/router'
import routes from 'common/routes'

export type QueryParams = { id: string | string[] }
export type PageParams = Page<QueryParams, ManageSlotQuery>

export const fetcher = async (ctx: SSPContext) => {
  try {
    const client = apolloClientFromCtx(ctx)
    const { id } = ctx.query
    const { data } = await client.query<ManageSlotQuery>({
      query: ManageSlotDocument,
      variables: { id },
    })
    return data
  } catch (error) {
    console.error({ error })
  }
}

function ManageSlotPage({ slot }: PageParams) {
  const router = useRouter()
  const classes = useStyles()
  if (!slot) {
    return <Error statusCode={404} title="Slot not found" />
  }
  const onUpdated = () => {
    const { href, as } = routes.slots.index
    router.push(href, as)
  }
  return (
    <Grid container alignItems="flex-start">
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Box p={3} className={classes.leftColumn}>
            <SlotForm slot={slot} onFormSuccess={onUpdated} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default (params: PageParams) => (
  <Layout title="Slots">
    <Typography variant="h2" paragraph>
      Slot: {params.slot?.name}
    </Typography>
    <ManageSlotPage {...params} />
  </Layout>
)
