import gql from 'graphql-tag'

export default gql`
  query MyBusinessList($ownerId: UUID!) {
    businessesList(condition: { ownerId: $ownerId }, orderBy: CREATED_AT_ASC) {
      id
      name
      description
      photoUrl
      markerUrl
      ownerId
      address
      location {
        longitude
        latitude
      }
    }
  }
`
