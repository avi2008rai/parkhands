import gql from 'graphql-tag'

export default gql`
  mutation UpdateBooking($id: UUID!, $patch: SlotBookingPatch!) {
    updateSlotBooking(input: { id: $id, patch: $patch }) {
      slotBooking {
        id
        status
      }
    }
  }
`
