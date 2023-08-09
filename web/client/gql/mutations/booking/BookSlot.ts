import gql from 'graphql-tag'

// {
//   "payload": {
//     "slotId": "669ac134-479e-47cd-bd5b-551474e7b455",
//     "startTime": "2020-07-08 12:30:00",
//     "endTime": "2020-07-08 14:25:00",
//     "licensePlate": "A 2233 BC",
//     "phone": "+49232323232"
//   }
// }

export default gql`
  mutation BookSlot($payload: BookSlotInputRecordInput!) {
    bookSlot(input: { payload: $payload }) {
      slotBooking {
        id
        slotId
        slot {
          id
          name
          description
        }
        userId
        status
        licensePlate
        phone
        startTime
        endTime
      }
    }
  }
`
