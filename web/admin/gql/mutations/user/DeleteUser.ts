import gql from 'graphql-tag'

export default gql`
  mutation DeleteUser($id: UUID!) {
    deleteUser(input: { id: $id }) {
      deletedUserNodeId
    }
  }
`
