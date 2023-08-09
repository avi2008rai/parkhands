import { PickArrayType, SlotByIdQuery } from 'gql/schema'

import round from './round'
import { differenceInHours } from './time'

type Slot = PickArrayType<SlotByIdQuery['slot']>
type CalculateBookingPricesProps = {
  slot: Slot
  startTime: Date
  endTime: Date
}

export default function calculateBookingPrices({
  slot,
  startTime,
  endTime,
}: CalculateBookingPricesProps) {
  const bookingDurationInHours = differenceInHours(endTime, startTime)

  return {
    priceDecimal: round(slot.pricePerHour * bookingDurationInHours, 2),
    priceInCents: round(slot.pricePerHour * 100 * bookingDurationInHours),
    hours: bookingDurationInHours,
  }
}
