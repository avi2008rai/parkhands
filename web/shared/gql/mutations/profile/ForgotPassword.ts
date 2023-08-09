import gql from 'graphql-tag'

export default gql`
  mutation ForgotPassword($payload: ForgotPasswordInputRecordInput!) {
    forgotPassword(input: { payload: $payload }) {
      boolean
    }
  }
`
