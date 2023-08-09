import React from 'react'
import Error from 'next/error'
import { Paper, Typography, Grid, Box } from '@material-ui/core'

import Layout from 'components/layout/Layout'
import { Page, SSPContext } from 'common/utils/appParams'
import { apolloClientFromCtx } from 'common/utils/apolloClient'
import { ManageSpaceQuery, ManageSpaceDocument } from 'gql/schema'

import SpaceForm from '../SpaceForm'
import useStyles from '../styles'
import { useRouter } from 'next/router'
import routes from 'common/routes'

import { useDomain } from 'common/i18n'

import { Domain } from 'common/i18n/locale'

const t = useDomain(Domain.Spaces)

export type QueryParams = { id: string | string[] }
export type PageParams = Page<QueryParams, ManageSpaceQuery>

export const fetcher = async (ctx: SSPContext) => {
  try {
    const client = apolloClientFromCtx(ctx)
    const { id } = ctx.query
    const { data } = await client.query<ManageSpaceQuery>({
      query: ManageSpaceDocument,
      variables: { id },
    })
    return data
  } catch (error) {
    console.error({ error })
  }
}

function ManageSlotPage({ parkingSpace }: PageParams) {
  const router = useRouter()
  const classes = useStyles()
  if (!parkingSpace) {
    return <Error statusCode={404} title="Space not found" />
  }
  const onUpdated = () => {
    const { href, as } = routes.spaces.index
    router.push(href, as)
  }
  return (
    <Grid container alignItems="flex-start">
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Box p={3} className={classes.leftColumn}>
            <SpaceForm parkingSpace={parkingSpace} onFormSuccess={onUpdated} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}
/* 
const { t } = useTranslation(Domain.Spaces) */
export default (params: PageParams) => (
  <Layout title="Space">
    <Typography variant="h2" paragraph>
    {t('space')} {params.parkingSpace?.name}
    </Typography>
    <ManageSlotPage {...params} />
  </Layout>
)
