import gql from 'graphql-tag'

export default gql`
  query ParkingSpacesByIds($ids: [UUID!]) {
    parkingSpacesList(filter: {id: {in: $ids}}) {
      id
      name
      photoUrl
      slotsList {
        id
      }
    }
  }
`
