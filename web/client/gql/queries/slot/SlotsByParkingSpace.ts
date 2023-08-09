import gql from 'graphql-tag'

export default gql`
  query SlotsByParkingSpace($parkingSpaceId: UUID!) {
    slotsList(condition: { parkingSpaceId: $parkingSpaceId }) {
      id
      name
      pricePerHour
      photoUrl
      parkingSpaceId
      status
    }
  }
`
