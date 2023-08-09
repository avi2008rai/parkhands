import gql from 'graphql-tag'

export default gql`
  mutation UpdateBusiness($id: UUID!, $patch: BusinessPatch!) {
    updateBusiness(input: { id: $id, patch: $patch }) {
      business {
        id
        name
        description
        photoUrl
        markerUrl
        ownerId
        address
        location {
          longitude
          latitude
        }
      }
    }
  }
`
