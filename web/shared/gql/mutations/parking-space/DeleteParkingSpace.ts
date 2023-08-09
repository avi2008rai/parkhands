import gql from 'graphql-tag'

export default gql`
  mutation DeleteParkingSpace($id: UUID!) {
    deleteParkingSpace(input: { id: $id }) {
      deletedParkingSpaceNodeId
    }
  }
`
