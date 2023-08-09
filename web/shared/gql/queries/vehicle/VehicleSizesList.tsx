import gql from 'graphql-tag'

export default gql`
  query VehicleSizesList {
    vehicleSizesList(orderBy: WEIGHT_ASC) {
      id
      name
      description
      status
    }
  }
`
