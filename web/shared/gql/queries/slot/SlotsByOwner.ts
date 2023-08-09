import gql from 'graphql-tag'

import CommonSlotFields from './fragments/CommonSlotFields'

export default gql`
  query SlotsByOwner($ownerId: UUID!, $timeForBookingCheck: Datetime!, $offset: Int, $first: Int) {
    slots(
      orderBy: CREATED_AT_DESC
      offset: $offset
      first: $first
      condition: { ownerId: $ownerId }
    ) {
      nodes {
        ...CommonSlotFields
        slotBookingsList(
          filter: {
            and: {
              startTime: { lessThan: $timeForBookingCheck }
              endTime: { greaterThan: $timeForBookingCheck }
              status: { notEqualTo: CANCELED }
            }
          }
          first: 1
        ) {
          id
          phone
          startTime
          endTime
          licensePlate
          status
          user {
            id
            name
          }
        }
      }
      totalCount
    }
  }
  ${CommonSlotFields}
`
