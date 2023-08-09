import gql from 'graphql-tag'

export default gql`
  mutation CreateUser($payload: CreateUserInputRecordInput!) {
    createUser(input: { payload: $payload }) {
      user {
        id
        name
        status
      }
    }
  }
`
