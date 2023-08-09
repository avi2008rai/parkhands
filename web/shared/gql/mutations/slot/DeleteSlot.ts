import gql from 'graphql-tag'

export default gql`
  mutation DeleteSlot($id: UUID!) {
    deleteSlot(input: { id: $id }) {
      deletedSlotNodeId
    }
  }
`
