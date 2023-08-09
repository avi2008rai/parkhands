import gql from 'graphql-tag'

export default gql`
  fragment CommonBookingFields on SlotBooking {
    id
    slotId
    slot {
      id
      name
      location {
        longitude: x
        latitude: y
      }
    }
    userId
    user {
      id
      name
    }
    status
    phone
    licensePlate
    startTime
    endTime
    createdAt
    checkInAt
    checkOutAt
  }
`
