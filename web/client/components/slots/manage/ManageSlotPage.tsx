import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Typography, Grid, Container } from '@material-ui/core'

import routes from 'common/routes'
import SlotForm from 'components/slots/form/SlotForm'
import { Domain } from 'common/i18n/locale'

import { Page, SSPContext } from 'common/utils/appParams'
import { apolloClientFromCtx } from 'common/utils/apolloClient'
import { ManageSlotQuery, ManageSlotDocument } from 'gql/schema'

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

export default function ManageSlotPage({ slot }: PageParams) {
  const router = useRouter()
  const { t } = useTranslation(Domain.Pages)
  const onFormSuccess = () => {
    const { href, as } = routes.slots.index
    router.push(href, as)
  }
  return (
    <Container maxWidth="lg">
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h2" paragraph>
            {t('Update slot')}
          </Typography>
        </Grid>
        <Grid item>{slot && <SlotForm slot={slot} onFormSuccess={onFormSuccess} />}</Grid>
      </Grid>
    </Container>
  )
}
