import gql from 'graphql-tag'

import CommonSpaceFields from './fragments/CommonSpaceFields'

export default gql`
  query SpacesByOwner($ownerId: UUID!, $timeForBookingCheck: Datetime!, $offset: Int, $first: Int) {
    parkingSpace(id: $ownerId) {
      id
    }
  }
  ${CommonSpaceFields}
`
