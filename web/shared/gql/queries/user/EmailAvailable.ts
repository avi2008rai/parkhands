import gql from 'graphql-tag'

export default gql`
  query EmailAvailable($email: Email!) {
    emailAvailable(requestedEmail: $email)
  }
`
