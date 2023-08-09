import gql from 'graphql-tag'

export default gql`
  mutation SlotBookingAttend($payload: SlotBookingAttendanceInputRecordInput!) {
    slotBookingAttend(input: { payload: $payload }) {
      slotBooking {
        id
        status
        startTime
        endTime
        checkInAt
        checkOutAt
      }
    }
  }
`
