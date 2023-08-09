import gql from 'graphql-tag'

export default gql`
  mutation UpdateVehicle($id: UUID!, $patch: VehiclePatch!) {
    updateVehicle(input: { id: $id, patch: $patch }) {
      vehicle {
        id
        name
        status
        ownerId
        licensePlate
        vehicleTypeId
      }
    }
  }
`
