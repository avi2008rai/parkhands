import gql from 'graphql-tag'

export default gql`
  query ManageSpace($id: UUID!) {
    parkingSpace(id: $id) {
      id
      ownerId
      name
      description
      photoUrl
      address
      location {
        latitude
        longitude
      }
      carEntry {
        x
        y
      }
      carExit {
        x
        y
      }
      companyEntrance {
        x
        y
      }
      parkingspaceMapview {
        geojson
      }
      languageCode
      floor
      category
      status
      accessRestriction
      businessStatusReason
      parkingSpaceAvailabilitiesList {
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
