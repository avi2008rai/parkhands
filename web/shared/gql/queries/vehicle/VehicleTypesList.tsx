import gql from 'graphql-tag'

export default gql`
  query VehicleTypesList {
    vehicleTypesList(orderBy: WEIGHT_ASC) {
      id
      name
      weight
    }
  }
`
