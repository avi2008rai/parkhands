import gql from 'graphql-tag'

export default gql`
  query ManageUser($id: UUID!) {
    user(id: $id) {
      nodeId
      id
      name
      email
      role
      status
      slotsByOwnerIdList(orderBy: CREATED_AT_DESC) {
        id
        name
        address
        photoUrl
        pricePerHour
        slotAmenitiesList {
          amenityId
          amenity {
            id
            name
          }
        }
      }
      vehiclesByOwnerIdList(orderBy: CREATED_AT_DESC) {
        id
        name
        status
        licensePlate
        vehicleTypeId
        vehicleType {
          id
          name
        }
      }
    }
  }
`
