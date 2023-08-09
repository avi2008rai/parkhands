import gql from 'graphql-tag'

export default gql`
  query VehiclesList {
    vehiclesList(orderBy: CREATED_AT_DESC) {
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
      }
    }
  }
`
