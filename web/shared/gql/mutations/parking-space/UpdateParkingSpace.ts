import gql from 'graphql-tag'

export default gql`
  mutation UpdateParkingSpace($id: UUID!, $patch: ParkingSpacePatch!) {
    updateParkingSpace(input: { patch: $patch, id: $id }) {
      parkingSpace {
        id
        name
        slug
        location {
          longitude
          latitude
        }
        address
        status
        carEntry {
          longitude: x
          latitude: y
        }
        carExit {
          longitude: x
          latitude: y
        }
      }
    }
  }
`
