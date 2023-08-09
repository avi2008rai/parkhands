import gql from 'graphql-tag'

export default gql`
  query SpaceById($id: UUID!) {
    parkingSpace(id: $id) {
      id
      name
      description
      photoUrl
      status
      ownerId
      address
      location {
        longitude
        latitude
      }
      parkingSpaceAvailabilitiesList {
        id
        parkingSpaceId
        fromDate
        toDate
        defaultFlag
        closedFlag
        parkingWorkingHoursList {
          dayOfWeek
          fromTime
          toTime
        }
        parkingOpenHoursList {
          dayOfWeek
          fromTime
          toTime
          price
          currency
        }
      }
    }
  }
`
