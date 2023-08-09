import gql from 'graphql-tag'

export default gql`
  mutation CreateParkingSpace($input: CreateParkingSpaceInput!) {
    createParkingSpace(input: $input) {
      parkingSpace {
        id
        name
        slug
        location {
          longitude
          latitude
        }
        address
        status
        carEntry {
          longitude: x
          latitude: y
        }
        carExit {
          longitude: x
          latitude: y
        }
        parkingSpaceAvailabilitiesList {
          id
          parkingSpaceId
          fromDate
          toDate
          defaultFlag
          closedFlag
          parkingWorkingHoursList {
            id
            parkingSpaceAvailabilityId
            dayOfWeek
            fromTime
            toTime
          }
          parkingOpenHoursList {
            id
            parkingSpaceAvailabilityId
            dayOfWeek
            fromTime
            toTime
            price
            currency
          }
        }
      }
    }
  }
`
