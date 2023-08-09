import React, { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

import { SlotBookingByIdDocument, SlotBookingByIdQuery } from 'gql/schema'
import routes from 'common/routes'
import { Page, SSPContext } from 'common/utils/appParams'
import { apolloClientFromCtx } from 'common/utils/apolloClient'
import BookingTicketDialog from 'components/bookings/ticket/BookingTicketDialog'
import { useMapCenter } from 'components/hooks/useMapCenter'
import { useBooking } from 'components/hooks/useBooking'

export type QueryParams = { id: string | string[] }
export type PageParams = Page<QueryParams, SlotBookingByIdQuery>

export const fetcher = async (ctx: SSPContext, slotBookingId: string) => {
  try {
    const client = apolloClientFromCtx(ctx)
    const { data } = await client.query<SlotBookingByIdQuery>({
      query: SlotBookingByIdDocument,
      variables: { id: slotBookingId },
    })
    return data
  } catch (error) {
    console.error({ error })
  }
}

export default function ViewBookingPage({ slotBooking }: PageParams) {
  const { setMapCenterView } = useMapCenter()
  const { setBooking } = useBooking()
  const { back, query, push } = useRouter()

  useEffect(() => {
    if (slotBooking?.slot?.location) {
      setMapCenterView({
        lat: slotBooking.slot?.location.latitude,
        lng: slotBooking.slot?.location.longitude,
        useDeviceLocation: false, // Don't center the map to the device location
      })
    }
  }, [slotBooking?.slot?.location])

  useEffect(() => {
    if (slotBooking) {
      setBooking(slotBooking)
    }
  }, [slotBooking])

  const onClose = useCallback(() => {
    if (query.closeToDashboard) {
      push(routes.dashboard, routes.dashboard)
    } else {
      back()
    }
  }, [query.closeToDashboard])

  return <BookingTicketDialog slotBookingId={slotBooking?.id} onClose={onClose} />
}
