import gql from 'graphql-tag'

export default gql`
  mutation UpdateProfile($payload: JSON!) {
    updateUser(input: { payload: $payload }) {
      user {
        id
        name
        address
      }
    }
  }
`
