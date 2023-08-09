import gql from 'graphql-tag'

export default gql`
  query SlotBookingStatus($payload: SlotBookingStatusInputRecordInput!) {
    slotBookingStatus(payload: $payload)
  }
`
