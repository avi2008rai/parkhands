module.exports = {
  queries: {
    list_bookings: `
      query SlotBookings {
        slotBookings {
          nodes {
            id
            endTime
            createdAt
            licensePlate
            slotId
            startTime
            userId
            status
            phone
            checkInAt
            checkOutAt
          }
        }
      }

    `,
    list_all_amenities: `
      query {
        amenitiesList {
          id
        }
      }
    `,
    list_slots: `
      query {
        slotsList {
          id
          name
          ownerId
          vehicleSizeId
          verificationStatus
          pricePerHour
          slug
          status
          deleted
          location {
            geojson
          }
          businessStatus
          businessStatusReason
          category
          contributorId
          level
          mapSource
          slotDimensions
          tempUnavailable
          tempUnavailableFrom
          tempUnavailableTo
          waypoints
          notes
          address
          timezone
          slotAmenitiesList {
            amenity {
              id
              name
            }
          }
        }
      }
    `,
    list_ongoing_bookings: `query SlotsWithOngoingBooking($time: Datetime!, $ownerId: UUID!) {
      slotsList(condition: {ownerId: $ownerId}) {
        id
        name
        slotBookingsList(filter: {and: {startTime: {lessThan: $time}, endTime: {greaterThan: $time}, status: {notEqualTo: CANCELED}}}, first: 1) {
          id
          phone
          startTime
          endTime
          status
          user {
            id
            name
          }
        }
      }
    }`,
    active_booking: `query ActiveBooking($payload: ActiveBookingInputRecordInput!) {
      activeBooking(payload: $payload) {
        id
        slotId
        slot {
          id
          name
          timezone
        }
        userId
        status
        licensePlate
        startTime
        endTime
        createdAt
      }
    }`,
    slot_booking_status: `
      query SlotBookingStatus($payload: SlotBookingStatusInputRecordInput!) {
        slotBookingStatus(payload: $payload)
      }
    `,
  },
  mutations: {
    book_slot_exec: `
      mutation bookSlot($payload: BookSlotInputRecordInput!) {
        bookSlot(input: { payload: $payload }) {
          slotBooking {
            id
            slotId
            userId
            startTime
            endTime
            licensePlate
            phone
          }
        }
      }
    `,
    bookingAttendance: `
      mutation SlotBookingAttend($payload: SlotBookingAttendanceInputRecordInput!) {
        slotBookingAttend(input: { payload: $payload}) {
          slotBooking {
            id
            slotId
            userId
            status
            startTime
            endTime
            checkInAt
            checkOutAt
          }
        }
      }

    `,
    slot: {
      update: `
        mutation UpdateSlot($id: UUID!, $patch: SlotPatch!) {
          updateSlot(input: { id: $id, patch: $patch }) {
            slot {
              id
              name
              ownerId
              status
              verificationStatus
              pricePerHour
              parkingSpaceId
              slotAmenitiesList {
                amenityId
              }
            }
          }
        }
      `,
      create: `
        mutation CreateSlot($payload: CreateSlotInput!) {
          createSlot(input: $payload) {
            slot {
              id
              name
              ownerId
              vehicleSizeId
              status
              verificationStatus
              pricePerHour
              parkingSpaceId
              slug
              location {
                geojson
              }
              notes
              address
              timezone
              slotAmenitiesList {
                amenity {
                  id
                  name
                }
              }
            }
          }
        }
      `,
      delete: `
        mutation deleteSlot($id: UUID!) {
          deleteSlot(input: { id: $id }) {
            slot { id }
          }
        }
      `,
    },
    availability: {
      create: `
        mutation CreateSlotAvailability($payload: CreateSlotAvailabilityInput!) {
          createSlotAvailability(input: $payload) {
            slotAvailability {
              slotId
              dayOfWeek
              startHour
              endHour
            }
          }
        }
      `,
    },
  },
  variables: {
    book: {
      book_slot_1: function(
        user,
        slot,
        start = new Date(new Date().setHours(13)),
        end = new Date(new Date().setHours(15)),
      ) {
        return {
          payload: {
            slotId: slot.id,
            userId: user.me.id,
            startTime: start,
            endTime: end,
            licensePlate: 'GG 3333 GG',
            phone: '+49111111111',
          },
        }
      },
    },
    active_booking: {
      interval: interval => ({
        payload: {
          interval,
        },
      }),
      start_interval: (startTime, interval) => ({
        payload: {
          startTime,
          interval,
        },
      }),
    },
    availability: {
      create_12_18: function(slot, dow, start = '12:00', end = '18:00') {
        return {
          payload: {
            slotAvailability: {
              slotId: slot.id,
              dayOfWeek: dow,
              startHour: start,
              endHour: end,
            },
          },
        }
      },
    },
    slot: {
      create_slot_1: function(user, amenities, vehicle_size_id, price_per_hour = 5) {
        return {
          payload: {
            slot: {
              name: 'Temp Slot 1',
              vehicleSizeId: vehicle_size_id,
              pricePerHour: price_per_hour,
              ownerId: user.me.id,
              location: {
                type: 'Point',
                coordinates: [23.325264751911163, 42.70777315898353],
                crs: {
                  type: "name",
                  properties: {
                    name: "urn:ogc:def:crs:EPSG::4326"
                  }
                }
              },
              slotAmenitiesUsingId: {
                create: [
                  {
                    amenityId: amenities[0].id,
                  },
                  {
                    amenityId: amenities[1].id,
                  },
                  {
                    amenityId: amenities[2].id,
                  },
                ],
              },
            },
          },
        }
      },
      create_slot_no_amenities: function(
        user,
        vehicle_size_id,
        status = 'ENABLED',
        parkingSpaceId = null,
      ) {
        return {
          payload: {
            slot: {
              name: 'Temp Slot 1',
              vehicleSizeId: vehicle_size_id,
              pricePerHour: 5,
              status,
              parkingSpaceId,
              ownerId: user.me.id,
              location: {
                type: 'Point',
                coordinates: [23.325264751911163, 42.70777315898353],
                crs: {
                  type: "name",
                  properties: {
                    name: "urn:ogc:def:crs:EPSG::4326"
                  }
                }
              },
            },
          },
        }
      },
      create_slot_w_timezone: function(user, vehicle_size_id, timezone = undefined) {
        return {
          payload: {
            slot: {
              name: 'Temp Slot w Timezone',
              vehicleSizeId: vehicle_size_id,
              pricePerHour: 5,
              status: 'ENABLED',
              ownerId: user.me.id,
              timezone,
              location: {
                type: 'Point',
                coordinates: [23.3218675, 42.6977082],
                crs: {
                  type: "name",
                  properties: {
                    name: "urn:ogc:def:crs:EPSG::4326"
                  }
                }
              },
            },
          },
        }
      },
      update_slot_1: function(slots, amenities) {
        return {
          id: slots['temp_1'].id,
          patch: {
            slotAmenitiesUsingId: {
              deleteOthers: true,
              create: [
                {
                  amenityId: amenities[0].id,
                },
                {
                  amenityId: amenities[1].id,
                },
                {
                  amenityId: amenities[3].id,
                },
              ],
            },
          },
        }
      },
    },
  },
}
