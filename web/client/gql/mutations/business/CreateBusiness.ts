import gql from 'graphql-tag'

/*
{
  "payload": {
    "business": {
      "name": "ACME",
    }
  }
}
*/

export default gql`
  mutation CreateBusiness($payload: CreateBusinessInput!) {
    createBusiness(input: $payload) {
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
