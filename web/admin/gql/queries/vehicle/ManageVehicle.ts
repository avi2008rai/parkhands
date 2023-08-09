import gql from 'graphql-tag'

export default gql`
  query ManageVehicle($id: UUID!) {
    vehicle(id: $id) {
      id
      name
      status
      licensePlate
      vehicleTypeId
      vehicleType {
        id
        name
      }
      vehicleSizeId
      vehicleSize {
        id
        name
        description
      }
      ownerId
      owner {
        id
        name
        email
      }
    }
  }
`
