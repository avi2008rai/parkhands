import gql from 'graphql-tag'

export default gql`
  query MyVehiclesList($ownerId: UUID!) {
    vehiclesList(condition: { ownerId: $ownerId }, orderBy: CREATED_AT_ASC) {
      id
      name
      status
      licensePlate
      vehicleTypeId
      vehicleSizeId
    }
  }
`
