import gql from 'graphql-tag'

import CommonBookingFields from './fragments/CommonBookingFields'

export default gql`
  query ActiveBooking($payload: ActiveBookingInputRecordInput!) {
    activeBooking(payload: $payload) {
      ...CommonBookingFields
    }
  }
  ${CommonBookingFields}
`
