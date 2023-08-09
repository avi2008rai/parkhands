import gql from 'graphql-tag'

// {
//   "payload": {
//     "slot": {
//       "name": "Experiment 37",
//       "pricePerHour": 5,
//       "location": {
//         "type": "Point",
//         "coordinates": [23.325264751911163, 42.70777315898353]
//       },
//       "ownerId": "fbc0cc53-602b-4ab6-b65a-fe8e60c57a09",
//       "slotAmenitiesUsingId": {
//         "create": [{
//           "amenityId": "bd97fd36-577d-4a57-a6eb-818dbdfbb96a"
//         }, {
//           "amenityId": "fc18ac3a-0bed-4153-befb-b6ac05820623"
//         }]
//       },
//       "slotAvailabilitiesUsingId": {
//         "create": [{
//           "dayOfWeek": 0,
//           "startHour": "12:00:00",
//           "endHour": "18:00:00"
//         }, {
//           "dayOfWeek": 1,
//           "startHour": "12:00:00",
//           "endHour": "18:00:00"
//         }]
//       }
//     }
//   }
// }

export default gql`
  mutation CreateSlot($payload: CreateSlotInput!) {
    createSlot(input: $payload) {
      slot {
        id
        name
        timezone
        slug
        accessRestrictions
        parkingSpaceId
        level
        location {
          longitude: x
          latitude: y
        }
        notes
        address
        slotAmenitiesList {
          amenity {
            id
            name
          }
        }
        slotAvailabilitiesList {
          id
          dayOfWeek
          startHour
          endHour
        }
        shape {
          geojson
        }
        tempUnavailable
        tempUnavailableFrom
        tempUnavailableTo
      }
    }
  }
`
