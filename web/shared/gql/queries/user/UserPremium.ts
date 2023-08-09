import gql from 'graphql-tag'

export default gql`
  query userPremium($userId: UUID!) {
    userPremium(userId: $userId)
  }
`
