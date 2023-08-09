import gql from 'graphql-tag'

export default gql`
  mutation UpdateBillingProfile($payload: UpdateBillingProfileInput!) {
    updateBillingProfile(input: $payload) {
      user {
        id
        billingProfilesList {
          id
          customerId
          billingDetails
        }
      }
      billingProfile {
        id
        customerId
        billingDetails
      }
    }
  }
`
