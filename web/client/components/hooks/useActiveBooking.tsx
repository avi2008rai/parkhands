import { isBefore, addSeconds, isAfter, format } from 'date-fns'
import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from 'react'

import { useActiveBookingLazyQuery, PickArrayType, ActiveBookingQuery } from 'gql/schema'

import { useUserContext } from './useUserContext'

const activeBookingInterval = { hours: 24 }

type Booking = PickArrayType<ActiveBookingQuery['activeBooking']>
type ActiveBookingContext = {
  activeBooking: Booking | null
  startHour?: string
  endHour?: string
  ongoing: boolean
  checkOngoing: () => void
  refreshBookings: () => void
}

const DefaultContext = (): ActiveBookingContext => {
  const { loggedIn } = useUserContext()
  const [ongoing, setOngoing] = useState(false)
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null)
  const [fetchBookings, { data }] = useActiveBookingLazyQuery({
    variables: { payload: { interval: activeBookingInterval } },
  })

  useEffect(() => {
    if (loggedIn) {
      // Fetch active booking only when user is logged in
      fetchBookings()
    }
  }, [loggedIn])

  useEffect(() => {
    // Update local state after XHR is done
    setActiveBooking(data?.activeBooking || null)
  }, [data])

  const checkOngoing = useCallback(() => {
    if (activeBooking) {
      // Adding 2 seconds to the check to display the start timer little bit earlier
      const ongoing = isBefore(new Date(activeBooking.startTime!), addSeconds(new Date(), 2))
      const expired = isAfter(new Date(), new Date(activeBooking.endTime!))
      if (expired) {
        setOngoing(false)
      } else {
        setOngoing(ongoing)
      }
    } else {
      setOngoing(false)
    }
  }, [activeBooking])

  useEffect(() => {
    // Update local state when booking record is updated
    checkOngoing()
  }, [activeBooking])

  return {
    activeBooking,
    ongoing,
    checkOngoing,
    get startHour() {
      if (activeBooking) {
        return format(new Date(activeBooking.startTime!), 'HH:mm')
      }
    },
    get endHour() {
      if (activeBooking) {
        return format(new Date(activeBooking.endTime!), 'HH:mm')
      }
    },
    refreshBookings: () => fetchBookings(),
  }
}

const ActiveBookingContext = createContext(null as any)

export function ActiveBookingProvider({ children }: { children?: ReactNode }) {
  const { Provider } = ActiveBookingContext
  return <Provider value={DefaultContext()}>{children}</Provider>
}

export function useActiveBooking() {
  return useContext<ActiveBookingContext>(ActiveBookingContext)
}
