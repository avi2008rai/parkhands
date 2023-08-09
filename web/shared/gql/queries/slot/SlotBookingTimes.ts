import gql from 'graphql-tag'

export default gql`
  query SlotBookingTimesList($payload: SlotBookingTimesInputRecordInput!) {
    slotBookingTimesList(payload: $payload) {
      slotId
      startTime
      endTime
    }
  }
`
