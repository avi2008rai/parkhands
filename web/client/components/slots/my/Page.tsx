import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Typography, Container, LinearProgress } from '@material-ui/core'

import { useSlotsByOwnerQuery } from 'gql/schema'
import { useUser } from 'components/hooks/useUser'
import FabMenu from 'components/common/FabMenu'
import ResultSetPagination, { usePagination } from 'components/common/ResultSetPagination'
import SlotGridListing from 'components/slots/list/SlotGridListing'
import UploadSlotsMenuItem from 'components/slots/list/UploadSlotsMenuItem'
import CreateSlotMenuItem from 'components/slots/list/CreateSlotMenuItem'

export default function ListingPage() {
  const { t } = useTranslation()
  const { userId } = useUser()
  const [now] = useState<Date>(new Date()) // So the time is calculated only once

  const { page, offset, itemsPerPage, changePage } = usePagination()

  const { data, loading, refetch } = useSlotsByOwnerQuery({
    variables: {
      ownerId: userId,
      timeForBookingCheck: now,
      offset: offset,
      first: itemsPerPage,
    },
  })

  return (
    <Container maxWidth="lg">
      <Grid container direction="column">
        <Grid item>
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Typography variant="h2" paragraph>
                {t('my_parking_slots')}
              </Typography>
            </Grid>
            <Grid item>
              <FabMenu fabProps={{ size: 'small' }}>
                <CreateSlotMenuItem onSuccess={refetch} />
                <UploadSlotsMenuItem onSuccess={refetch} />
                {/* <MenuItem disabled>{t('Add slots in bulk')}</MenuItem> */}
                {/* <MenuItem disabled>{t('Add new parking space')}</MenuItem> */}
              </FabMenu>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {loading || !data || !data.slots || !data.slots.nodes ? (
            <Grid item xs={12}>
              <LinearProgress color="secondary" />
            </Grid>
          ) : (
            <div>
              <SlotGridListing slots={data.slots.nodes} refetchSlots={refetch} />
              <ResultSetPagination
                totalCount={data.slots.totalCount}
                itemsPerPage={itemsPerPage}
                page={page}
                onChange={changePage}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}
