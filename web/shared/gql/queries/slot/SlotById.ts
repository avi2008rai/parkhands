import gql from 'graphql-tag'

export default gql`
  query SlotById($id: UUID!) {
    slot(id: $id) {
      id
      name
      description
      notes
      pricePerHour
      photoUrl
      status
      ownerId
      address
      location {
        longitude: x
        latitude: y
      }
      slotAmenitiesList {
        id
        amenity {
          id
          name
          description
          slug
        }
      }
      slotAvailabilitiesList {
        dayOfWeek
        startHour
        endHour
      }
    }
  }
`
