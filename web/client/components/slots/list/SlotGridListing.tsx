import _ from 'lodash'
import { useRouter } from 'next/router'
import React, { ReactNode, useState } from 'react'
import { Grid, LinearProgress } from '@material-ui/core'

import routes from 'common/routes'
import { useUser } from 'components/hooks/useUser'
import { SlotsListByOwnerQuery } from 'gql/schema'
import OwnSlotItem from 'components/slots/list/item/OwnSlotItem'
import CreateSlotButton from 'components/slots/list/CreateSlotButton'
import UploadSlotsButton from 'components/slots/list/UploadSlotsButton'

type SlotGridListingProps = {
  slots: SlotsListByOwnerQuery['slotsList']
  refetchSlots?: () => void
}

export default function SlotGridListing({ slots, refetchSlots }: SlotGridListingProps) {
  const router = useRouter()
  const { can } = useUser()

  return (
    <Grid container spacing={4}>
      {_.map(slots, (slot) => (
        <Grid item xs={12} sm={6} md={4} key={slot.id}>
          <OwnSlotItem
            slot={slot}
            buttonProps={{
              onClick: () => {
                const { href, as } = routes.slots.manageById({ id: slot.id })
                router.push(href, as)
              },
            }}
          />
        </Grid>
      ))}
      {slots?.length === 0 && can.createSlots && (
        <Grid item xs={12} sm={6} md={4}>
          <CreateSlotButton onSuccess={refetchSlots} />
        </Grid>
      )}
      {slots?.length === 0 && can.createSlots && (
        <Grid item xs={12} sm={6} md={4}>
          <UploadSlotsButton onSuccess={refetchSlots} />
        </Grid>
      )}
    </Grid>
  )
}
