import gql from 'graphql-tag'

import CommonBookingFields from './fragments/CommonBookingFields'

export default gql`
  query SlotBookingsByUserId($userId: UUID!, $filter: SlotBookingFilter) {
    slotBookingsList(condition: {userId: $userId}, orderBy: CREATED_AT_DESC, filter: $filter) {
      ...CommonBookingFields
      paymentReceipt {
        id
        paymentIntentId
        receiptUrl
        amount
      }
    }
  }
  ${CommonBookingFields}
`
