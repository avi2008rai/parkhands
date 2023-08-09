import gql from 'graphql-tag'

import CommonSpaceFields from './fragments/CommonSpaceFields'

export default gql`
  query SpacesList {
    parkingSpacesList(orderBy: CREATED_AT_DESC) {
      ...CommonSpaceFields
    }
  }
  ${CommonSpaceFields}
`
