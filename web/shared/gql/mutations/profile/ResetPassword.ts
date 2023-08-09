import gql from 'graphql-tag'

export default gql`
  mutation ResetPassword($payload: ResetPasswordInputRecordInput!) {
    resetPassword(input: { payload: $payload }) {
      boolean
    }
  }
`
