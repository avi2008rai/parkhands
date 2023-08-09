import gql from 'graphql-tag'

export default gql`
  mutation Register($payload: RegisterInputRecordInput) {
    register(input: { payload: $payload }) {
      jwtToken
    }
  }
`
