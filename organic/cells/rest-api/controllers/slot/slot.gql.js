module.exports = {
  getSlots: `
    query {
      slotsList {
        id
        name
        ownerId
        vehicleSizeId
        status
        slug
        location {
          geojson
        }
        notes
        address
        slotAmenitiesList {
          amenity {
            id
            name
          }
        }
        createdAt
        updatedAt
      }
    }
  `,

  getSlotDetails: function (id) {
    let query = `
          query {
            slot(id: "${id}") {
              id
              name
              ownerId
              vehicleSizeId
              status
              slug
              location {
                geojson
              }
              notes
              address
              slotAmenitiesList {
                amenity {
                  id
                  name
                }
              }
              createdAt
              updatedAt
            }
          }
        `
    return query
  },

  createSlot: `
    mutation CreateSlot($payload: CreateSlotInput!) {
      createSlot(input: $payload) {
        slot {
          id
          name
          ownerId
          vehicleSizeId
          status
          slug
          location {
            geojson
          }
          notes
          address
          slotAmenitiesList {
            amenity {
              id
              name
            }
          }
          createdAt
          updatedAt
        }
      }
    }
  `,

  updateSlot: `
    mutation UpdateSlot($id: UUID!, $patch: SlotPatch!) {
      updateSlot(input: { id: $id, patch: $patch }) {
        slot {
          id
          name
          ownerId
          vehicleSizeId
          status
          slug
          location {
            geojson
          }
          notes
          address
          slotAmenitiesList {
            amenity {
              id
              name
            }
          }
          createdAt
          updatedAt
        }
      }
    }
  `,

  deleteSlot: `
    mutation deleteSlot($id: UUID!) {
      deleteSlot(input: { id: $id }) {
        slot { id }
      }
    }
  `,

  slotAvailability: function (id) {
    let query = `
          query slotAvailabilitiesList {
            slotAvailabilitiesList(condition: {slotId: "${id}"}) {
              id
              slotId
              dayOfWeek
              startHour
              endHour
              createdAt
            }
          }`
    return query
  },

  slotBookings: function (id) {
    let query = `
          query slotBookingsList {
            slotBookingsList(condition: {slotId: "${id}"}) {
              id
              slotId
              userId
              status
              licensePlate
              startTime
              endTime
              createdAt
            }
          }`
    return query
  },

  findSlots: `
    query findSlots($payload: FindSlotsInputRecordInput) {
      findSlots(payload: $payload) {
        nodes {
          id
          name
          distance
          booked
          amenities {
            id
            name
          }
          vehicleSize {
            id
            name
          }
        }
      }
    }
  `,

  bookSlot: `
    mutation bookSlot($payload: BookSlotInputRecordInput!) {
      bookSlot(input: { payload: $payload }) {
        slotBooking {
          id
          slotId
          userId
          status
          licensePlate
          startTime
          endTime
          createdAt
        }
      }
    }
  `,

  slotBookingTimes: `
    query slotBookingTimesList($payload: SlotBookingTimesInputRecordInput) {
      slotBookingTimesList(payload: $payload) {
        slotId
        startTime
        endTime
      }
    }
  `,

  slotTimetable: `
    query slotTimetable($slotIds: [UUID], $timetableStartTime: Datetime, $timetableEndTime: Datetime){
      slotTimetableList(slotIds: $slotIds
                      , timetableStartTime: $timetableStartTime
                      , timetableEndTime: $timetableEndTime) {
        slotId
        startTime
        endTime
        timetableDate
        dayOfWeek
        booked
      }
    }
  `,
}
