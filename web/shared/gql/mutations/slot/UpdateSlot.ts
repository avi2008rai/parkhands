import gql from 'graphql-tag'

export default gql`
  mutation UpdateSlot($id: UUID!, $patch: SlotPatch!) {
    updateSlot(input: { id: $id, patch: $patch }) {
      slot {
        id
        name
        status
      }
    }
  }
`
