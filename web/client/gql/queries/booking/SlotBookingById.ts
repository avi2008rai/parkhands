import gql from 'graphql-tag'

export default gql`
  query SlotBookingById($id: UUID!) {
    slotBooking(id: $id) {
      id
      startTime
      endTime
      checkInAt
      checkOutAt
      licensePlate
      status
      slot {
        id
        name
        photoUrl
        location {
          longitude: x
          latitude: y
        }
      }
      paymentReceipt {
        id
        amount
        receiptUrl
      }
    }
  }
`
