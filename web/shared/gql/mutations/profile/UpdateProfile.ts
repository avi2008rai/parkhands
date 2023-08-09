import gql from 'graphql-tag'

export default gql`
  mutation UpdateProfile($payload: UpdateUserInputRecordInput!) {
    updateUser(input: { payload: $payload }) {
      user {
        id
        name
        email
        phone
      }
    }
  }
`
