import gql from 'graphql-tag'

export default gql`
  query FindSlots(
    $latitude: BigFloat!
    $longitude: BigFloat!
    $startTime: Datetime
    $endTime: Datetime
    $distance: Int
    $ownerId: UUID
    $totalLimit: Int
    $slotAmenities: [UUID]
    $vehicleSizes: [UUID]
  ) {
    findSlotsList(
      payload: {
        latitude: $latitude
        longitude: $longitude
        startTime: $startTime
        endTime: $endTime
        distance: $distance
        ownerId: $ownerId
        totalLimit: $totalLimit
        slotAmenities: $slotAmenities
        vehicleSizes: $vehicleSizes
      }
    ) {
      id
      status
      # name
      # shape
      # photoUrl
      inWorkingHours
      inAmenities
      booked
      parkingSpaceId
      location {
        longitude: x
        latitude: y
      }
    }
  }
`
