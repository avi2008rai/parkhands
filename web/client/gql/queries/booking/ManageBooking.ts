import gql from 'graphql-tag'

import CommonBookingFields from './fragments/CommonBookingFields'

export default gql`
  query ManageBooking($id: UUID!) {
    slotBooking(id: $id) {
      ...CommonBookingFields
    }
  }
  ${CommonBookingFields}
`
