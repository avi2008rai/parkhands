import gql from 'graphql-tag'

export default gql`
  query FindBusiness($payload: FindBusinessInputRecordInput!) {
    findBusinessList(payload: $payload) {
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
