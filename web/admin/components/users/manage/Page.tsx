import React from 'react'
import NextError from 'next/error'
import { Alert } from '@material-ui/lab'
import { useTranslation } from 'react-i18next'
import { Refresh, DirectionsCar, EmojiTransportation } from '@material-ui/icons'
import { Box, Grid, Paper, Typography, IconButton } from '@material-ui/core'

import { Domain } from 'common/i18n/locale'
import Layout from 'components/layout/Layout'
import { Page, SSPContext } from 'common/utils/appParams'
import { apolloClientFromCtx } from 'common/utils/apolloClient'
import {
  ManageUserQuery,
  ManageUserDocument,
  useManageUserQuery,
  useManageUserLazyQuery,
} from 'gql/schema'

import Form from './Form'
import UserSlotsListing from './UserSlotsListing'
import UserVehiclesListing from './UserVehiclesListing'

type QueryParams = { id: string | string[] }
export type PageParams = Page<QueryParams, ManageUserQuery>

export const fetcher = async (ctx: SSPContext) => {
  try {
    const client = apolloClientFromCtx(ctx)
    const { id } = ctx.query
    const { data } = await client.query<ManageUserQuery>({
      query: ManageUserDocument,
      variables: { id },
    })
    return data
  } catch (error) {
    console.error({ error })
  }
}

function ManageUserPage(initial: PageParams) {
  const { t } = useTranslation(Domain.Pages)
  const [fetchUser, { data, error }] = useManageUserLazyQuery({
    variables: { id: initial.id as string },
  })
  const user = data?.user || initial?.user

  if (!user) {
    return <NextError statusCode={404} title="User not found" />
  }
  if (error) {
    console.error(error)
    return <Alert severity="error">{error?.message}</Alert>
  }

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h2" gutterBottom>
          User: {user.name}
        </Typography>
        <Box>
          <IconButton onClick={() => fetchUser()}>
            <Refresh />
          </IconButton>
        </Box>
      </Box>
      <Grid container alignItems="flex-start" spacing={3}>
        <Grid item lg={8} xs={12}>
          <Paper>
            <Box p={2}>
              <Typography variant="subtitle1" gutterBottom>
                {t('profile')}
              </Typography>
              <Form user={user} refreshData={fetchUser} />
            </Box>
          </Paper>
        </Grid>
        <Grid item lg={8} xs={12}>
          <Paper>
            <Box p={2}>
              <EmojiTransportation />
              <Typography variant="subtitle1" gutterBottom>
                {t('slots')}
              </Typography>
              <UserSlotsListing user={user} refreshData={fetchUser} />
            </Box>
          </Paper>
        </Grid>
        <Grid item lg={8} xs={12}>
          <Paper>
            <Box p={2}>
              <DirectionsCar />
              <Typography variant="subtitle1" gutterBottom>
                {t('vehicles')}
              </Typography>
              <UserVehiclesListing user={user} refreshData={fetchUser} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default (params: PageParams) => (
  <Layout title="Users">
    <ManageUserPage {...params} />
  </Layout>
)
