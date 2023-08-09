import gql from 'graphql-tag'

export default gql`
  mutation DeleteVehicle($id: UUID!) {
    deleteVehicle(input: { id: $id }) {
      deletedVehicleNodeId
    }
  }
`
