import gql from 'graphql-tag'

export default gql`
  fragment CommonSpaceFields on ParkingSpace {
    id
    name
    photoUrl
    description
    location {
      longitude
      latitude
    }
    address
    status
    ownerId
    owner {
      id
      name
    }
  }
`
