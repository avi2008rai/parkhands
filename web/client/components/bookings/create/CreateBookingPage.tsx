import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { isValid } from 'date-fns'

import { SlotByIdDocument, SlotByIdQuery } from 'gql/schema'
import { Page, SSPContext } from 'common/utils/appParams'
import { apolloClientFromCtx } from 'common/utils/apolloClient'
import ActionDialog from 'components/common/ActionDialog'
import BookingForm from 'components/bookings/form/BookingForm'
import { useMapCenter } from 'components/hooks/useMapCenter'
import { useActiveBooking } from 'components/hooks/useActiveBooking'

export type QueryParams = { id: string | string[] }
export type PageParams = Page<QueryParams, SlotByIdQuery>

export const fetcher = async (ctx: SSPContext, slotId: string) => {
  try {
    const client = apolloClientFromCtx(ctx)
    const { data } = await client.query<SlotByIdQuery>({
      query: SlotByIdDocument,
      variables: { id: slotId },
    })
    return data
  } catch (error) {
    console.error({ error })
  }
}

export default function CreateBookingPage({ slot }: PageParams) {
  const { setMapCenterView } = useMapCenter()
  const { refreshBookings } = useActiveBooking()
  const { back, query } = useRouter()
  const bookingDuration = useMemo(() => {
    const startTime = new Date(query.startTime as string)
    const endTime = new Date(query.endTime as string)
    if (query.startTime && query.endTime && isValid(startTime) && isValid(endTime)) {
      return {
        startTime: startTime,
        endTime: endTime,
      }
    }
    return undefined
  }, [query.startTime, query.endTime])

  useEffect(() => {
    if (slot?.location) {
      setMapCenterView({
        lat: slot?.location.latitude,
        lng: slot?.location.longitude,
        useDeviceLocation: false, // Don't center the map to the device location
      })
    }
  }, [slot?.location])

  return (
    <ActionDialog flex headerLabel="booking_confirmation" open onClose={back}>
      {slot && (
        <BookingForm slot={slot} onFormSuccess={refreshBookings} duration={bookingDuration} />
      )}
    </ActionDialog>
  )
}
