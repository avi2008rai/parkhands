import gql from 'graphql-tag'

export default gql`
  mutation ActivateUser($payload: ActivateUserInputRecordInput!) {
    activateUser(input: { payload: $payload }) {
      jwtToken
    }
  }
`
