import gql from 'graphql-tag'

import AvailabilitySlotFields from './fragments/AvailabilitySlotFields'

export default gql`
  query SlotsAvailabilityById($slotId: UUID!) {
    slot(id: $slotId) {
      id
      name
      address
      location {
        longitude: x
        latitude: y
      }
      pricePerHour
      ...AvailabilitySlotFields
    }
  }
  ${AvailabilitySlotFields}
`
