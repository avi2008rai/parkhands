import { isBefore, addSeconds, isAfter, format } from 'date-fns'
import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from 'react'

import { useSlotBookingByIdLazyQuery, SlotBookingByIdQuery, BookingStatusT } from 'gql/schema'

type Booking = SlotBookingByIdQuery['slotBooking']
type BookingContext = {
  booking: Booking | null
  startHour?: string
  endHour?: string
  ongoing: boolean
  expired: boolean
  canceled: boolean
  setBooking: (booking: Booking) => void
  checkOngoing: () => void
  resetBooking: () => void
  refreshBooking: () => void
  fetchBooking: (id: string) => void
}

const DefaultContext = (): BookingContext => {
  const [ongoing, setOngoing] = useState(false)
  const [expired, setExpired] = useState(true)
  const [canceled, setCanceled] = useState(false)
  const [booking, setBooking] = useState<Booking | null>(null)
  const [fetch, { data }] = useSlotBookingByIdLazyQuery()

  useEffect(() => {
    // Update local state after XHR is done
    setBooking(data?.slotBooking || null)
  }, [data])

  const checkOngoing = useCallback(() => {
    if (booking) {
      // Adding 2 seconds to the check to display the start timer little bit earlier
      const ongoing = isBefore(new Date(booking.startTime!), addSeconds(new Date(), 2))
      const expired = isAfter(new Date(), new Date(booking.endTime!))
      setExpired(expired)
      setCanceled(booking.status === BookingStatusT.Canceled)
      if (expired) {
        setOngoing(false)
      } else {
        setOngoing(ongoing)
      }
    } else {
      setOngoing(false)
    }
  }, [booking])

  useEffect(() => {
    // Update local state when booking record is updated
    checkOngoing()
  }, [booking])

  return {
    booking,
    ongoing,
    expired,
    canceled,
    checkOngoing,
    get startHour() {
      if (booking) {
        return format(new Date(booking.startTime!), 'HH:mm')
      }
    },
    get endHour() {
      if (booking) {
        return format(new Date(booking.endTime!), 'HH:mm')
      }
    },
    setBooking: (booking) => setBooking(booking),
    resetBooking: () => setBooking(null),
    fetchBooking: (id) => fetch({ variables: { id } }),
    refreshBooking: () => {
      if (booking) {
        fetch({ variables: { id: booking.id } })
      }
    },
  }
}

const BookingContext = createContext(null as any)

export function BookingProvider({ children }: { children?: ReactNode }) {
  const { Provider } = BookingContext
  return <Provider value={DefaultContext()}>{children}</Provider>
}

export function useBooking() {
  return useContext<BookingContext>(BookingContext)
}
