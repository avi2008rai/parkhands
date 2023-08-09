import gql from 'graphql-tag'

export default gql`
  mutation Login($payload: LoginInputRecordInput!) {
    login(input: { payload: $payload }) {
      jwtToken
    }
  }
`
