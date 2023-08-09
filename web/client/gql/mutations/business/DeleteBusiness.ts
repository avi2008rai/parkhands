import gql from 'graphql-tag'

export default gql`
  mutation DeleteBusiness($id: UUID!) {
    deleteBusiness(input: { id: $id }) {
      deletedBusinessNodeId
    }
  }
`
