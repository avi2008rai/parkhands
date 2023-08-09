import gql from 'graphql-tag'

export default gql`
  mutation ResendActivationEmail($email: Email!) {
    resendActivationEmail(input: { requestedEmail: $email }) {
      success: boolean
    }
  }
`
