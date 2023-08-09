import gql from 'graphql-tag'

export default gql`
  fragment AvailabilitySlotFields on Slot {
    slotAvailabilitiesList {
      id
      dayOfWeek
      startHour
      endHour
    }
  }
`
