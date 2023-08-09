import gql from 'graphql-tag'

import CommonBookingFields from './fragments/CommonBookingFields'

export default gql`
  query BookingsList {
    slotBookingsList(orderBy: CREATED_AT_DESC) {
      ...CommonBookingFields
    }
  }
  ${CommonBookingFields}
`