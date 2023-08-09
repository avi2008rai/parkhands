import gql from 'graphql-tag'

export default gql`
  fragment CommonSlotFields on Slot {
    id
    name
    notes
    photoUrl
    timezone
    description
    pricePerHour
    location {
      longitude: x
      latitude: y
    }
    address
    status
    ownerId
    owner {
      id
      name
    }
  }
`
