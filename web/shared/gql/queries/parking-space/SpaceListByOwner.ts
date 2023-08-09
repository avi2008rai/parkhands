import gql from 'graphql-tag'

import CommonSpaceFields from './fragments/CommonSpaceFields'

export default gql`
  query SpacesListByOwner(
    $ownerId: UUID!
    $timeForBookingCheck: Datetime!
    $offset: Int
    $first: Int
  ) {
    parkingSpacesList(
      orderBy: CREATED_AT_DESC
      offset: $offset
      first: $first
      condition: { ownerId: $ownerId }
    ) {
      ...CommonSpaceFields
    }
  }
  ${CommonSpaceFields}
`
