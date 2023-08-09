import gql from 'graphql-tag'

export default gql`
  mutation RegisterUser($payload: RegisterInputRecordInput) {
    signup(input: { payload: $payload }) {
      jwtToken
    }
  }
`
