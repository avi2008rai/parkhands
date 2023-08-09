import gql from 'graphql-tag'

export default gql`
  mutation DeleteAccount($id: UUID!) {
    deleteUser(input: { id: $id }) {
      deletedUserNodeId
    }
  }
`
