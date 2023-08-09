import gql from 'graphql-tag'

export default gql`
  query ManageSlot($id: UUID!) {
    slot(id: $id) {
      id
      name
      notes
      timezone
      accessRestrictions
      category
      level
      status
      slotAmenitiesList {
        amenityId
      }
      slotAvailabilitiesList {
        id
        dayOfWeek
        startHour
        endHour
      }
      description
      pricePerHour
      owner {
        id
        name
        email
      }
      status
      photoUrl
      address
      vehicleSizeId
      location {
        longitude: x
        latitude: y
      }
      verificationStatus
      parkingSpaceId
      businessStatusReason

      shape {
        geojson
      }
      tempUnavailable
      tempUnavailableFrom
      tempUnavailableTo
      waypoints
    }
  }
`
