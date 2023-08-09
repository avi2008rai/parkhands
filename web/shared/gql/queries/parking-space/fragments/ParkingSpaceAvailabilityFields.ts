import gql from 'graphql-tag'

export default gql`
  fragment ParkingSpaceAvailabilityFields on ParkingSpace {
    parkingSpaceAvailabilitiesList {
      id
      parkingSpaceId
      fromDate
      toDate
      defaultFlag
      closedFlag
    }
  }
  `
