import gql from 'graphql-tag'

export default gql`
  mutation UpdateUser($payload: UpdateUserInputRecordInput!) {
    updateUser(input: { payload: $payload }) {
      user {
        id
        name
        status
      }
    }
  }
`
