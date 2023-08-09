// import path from 'path'
const path = require('path')
const moment = require('moment')
const _ = require('lodash')

describe('Find Slots', () => {
  let users = {},
    slots = [],
    amenities = [],
    vehicle_sizes = [],
    queries = {}

  let slotGqlRepo = require(path.join(process.cwd(), 'test/api/slot/slot.gqlrepo.js'))

  const centerPoint = {
    latitude: '57.158675',
    longitude: '-2.084919',
  }

  queries['list-all-slots'] = `
    query {
      slotsList(orderBy: NAME_ASC) {
        id
        name
        status
        deleted
        slotAmenitiesList {
          amenity {
            id
            name
          }
        }
      }
    }
  `

  queries['list-all-amenities'] = `
    query {
      amenitiesList(orderBy: NAME_ASC) {
        id
        name
      }
    }
  `

  queries['list-all-vehicle-sizes'] = `
    query {
      vehicleSizesList(orderBy: NAME_ASC) {
        id
        name
      }
    }
  `

  queries['find-slots'] = `
    query findSlots($payload: FindSlotsInputRecordInput) {
      findSlots(payload: $payload) {
      nodes {
        id
        status
        location {
          geojson
        }
        parkingSpaceId
        booked
        inWorkingHours
        inAmenities
        inVs
      }
    }
  }
  `

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('Prepare use cases', () => {
    it('Get all test slots', done => {
      test.graphService()
        .send({
          query: queries['list-all-slots'],
        })
        .expect(200, done)
        .expect(r => {
          slots = r.body.data.slotsList
          // All enabled slots, even unlisted
          slots.length.should.equal(10)
          // Check if all test slots are available with provided statuses
          slots.filter((slot) => slot.status === 'ENABLED').length.should.equal(8)
          slots.filter((slot) => slot.status === 'DISABLED').length.should.equal(1)
          slots.filter((slot) => slot.status === 'UNLISTED').length.should.equal(1)
        })
    })

    it('Get all amenities', done => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: queries['list-all-amenities'],
        })
        .expect(200, done)
        .expect(r => {
          amenities = r.body.data.amenitiesList
          amenities.length.should.equal(19)
        })
    })

    it('Get all vehicle sizes', done => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: queries['list-all-vehicle-sizes'],
        })
        .expect(200, done)
        .expect(r => {
          vehicle_sizes = r.body.data.vehicleSizesList
          vehicle_sizes.length.should.equal(3)
        })
    })
  })

  describe('Find Slots', () => {
    describe('Distance OR Nearest', () => {
      it('Find free slots in distance 5km - for next 5 minutes (because no start/end times are provided)', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 5000
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.findSlots.nodes.length.should.equal(7)
          })
      })

      it('Find free slots in distance 1km', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 2000,
              }
            },
          })
          .expect(200, done)
          .expect(r => {

            r.body.data.findSlots.nodes.length.should.equal(7)
          })
      })

      it('Find free slots in distance 1km', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 1000,
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.findSlots.nodes.length.should.equal(6)
          })
      })

      it('Find free slots in distance 100m', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 100,
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.findSlots.nodes.length.should.equal(1)
          })
      })
    })

    describe('In specific start/end times and respected working hours', () => {
      // Check out this file for slot bookings
      // `shared/db/test_data/test_data_slot_booking.sql`
      //
      // and this file for slot availability
      // `shared/db/test_data/test_data_slot_availability.sql`
      it('Find free slots in distance 5km - for 2020-05-29 between 09-11', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 5000,
                startTime: '2020-05-29 09:00:00',
                endTime: '2020-05-29 11:00:00',
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.findSlots.nodes.filter((slot) => slot.inWorkingHours === true).length.should.equal(5)
          })
      })

      it('Find free slots in distance 5km - for 2020-05-29 between 11-12', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 5000,
                startTime: '2020-05-29 11:00:00',
                endTime: '2020-05-29 12:00:00',
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.findSlots.nodes.filter((slot) => slot.inWorkingHours === true).length.should.equal(5)
          })
      })

      it('Find free slots in distance 5km - from 2020-05-30 11:00 until 2020-05-31 11:00', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 5000,
                startTime: '2020-05-30 11:00:00',
                endTime: '2020-05-31 11:00:00',
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.findSlots.nodes.filter((slot) => slot.inWorkingHours === true).length.should.equal(4)
          })
      })

      it('Find free slots in distance 5km - from 2020-05-30 11:00 until 2020-06-02 10:00', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 5000,
                startTime: '2020-05-30 11:00:00',
                endTime: '2020-06-02 10:00:00',
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.findSlots.nodes.filter((slot) => slot.inWorkingHours === true).length.should.equal(4)
          })
      })

      it('Find free slots in distance 5km - from 2020-06-02 00:00 until 2020-06-02 08:00', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 5000,
                startTime: '2020-06-02 00:00:00',
                endTime: '2020-06-02 08:00:00',
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.findSlots.nodes.filter((slot) => slot.inWorkingHours === true).length.should.equal(4)
          })
      })

      it('Find free slots in distance 5km - from 2020-06-03 20:00 until 2020-06-04 08:00', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 5000,
                startTime: '2020-06-03 20:00:00',
                endTime: '2020-06-04 08:00:00',
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.findSlots.nodes.filter((slot) => slot.inWorkingHours === true).length.should.equal(5)
          })
      })
    })

    describe('Check booked slots', () => {
      it('Find all (free and booked slots) in distance 5km - for 2020-05-29 between 09-11', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 5000,
                startTime: '2020-05-29 09:00:00',
                endTime: '2020-05-29 11:00:00',
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.findSlots.nodes.filter((slot) => slot.booked === true).length.should.equal(2)
          })
      })
    })

    describe('Filter by amenities', () => {
      // Check out this file for test cases of slot amenities
      // `shared/db/test_data/test_data_slot_amenity.sql`
      it('Find free slots in distance 5km filter by 1 amenity [Electric] - for 2020-05-29 between 09-11', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 5000,
                startTime: '2020-05-29 09:00:00',
                endTime: '2020-05-29 11:00:00',
                slotAmenities: [
                  _.filter(amenities, (el) => { return el.name == 'Electric' })[0].id
                ],
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.findSlots.nodes.filter((slot) => slot.inAmenities === true).length.should.equal(2)
          })
      })

      it('Find free slots in distance 5km filter by 2 amenities [Electric, Covered] - for 2020-05-29 between 09-11', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 5000,
                startTime: '2020-05-29 09:00:00',
                endTime: '2020-05-29 11:00:00',
                slotAmenities: [
                  _.filter(amenities, (el) => { return el.name == 'Electric' })[0].id,
                  _.filter(amenities, (el) => { return el.name == 'Covered' })[0].id
                ],
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.findSlots.nodes.filter((slot) => slot.inAmenities === true).length.should.equal(1)
          })
      })
    })

    describe('Filter by vehicle size', () => {
      // Check out this file for test cases of vehicle sizes
      // `shared/db/test_data/test_data_slot.sql`
      it('Find free slots in distance 5km filter by 1 vehicle size [Small] - for 2020-05-29 between 09-11', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 5000,
                startTime: '2020-05-29 09:00:00',
                endTime: '2020-05-29 11:00:00',
                vehicleSizes: ['2949716b-fbb7-4fcf-b0eb-be21471c91f5'],
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.findSlots.nodes.filter((slot) => slot.inVs === true).length.should.equal(1)
          })
      })

      it('Find free slots in distance 5km filter by 2 amenities [Small, Large] - for 2020-05-29 between 09-11', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 5000,
                startTime: '2020-05-29 09:00:00',
                endTime: '2020-05-29 11:00:00',
                vehicleSizes: [
                  '2949716b-fbb7-4fcf-b0eb-be21471c91f5',
                  '74fd2801-ede5-4ef6-856a-6db21836fe29'
                ]
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.findSlots.nodes.filter((slot) => slot.inVs === true).length.should.equal(2)
          })
      })
    })

    describe('Filter by owner_id / Provider slots', () => {
      it('Find slots by owner_id ', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 5000,
                ownerId: 'fbc0cc53-602b-4ab6-b65a-fe8e60c57a09'
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.findSlots.nodes.length.should.equal(5)
          })
      })

      it('Find slots by owner_id / Stacked with amenities filter', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 5000,
                ownerId: 'fbc0cc53-602b-4ab6-b65a-fe8e60c57a09',
                slotAmenities: [
                  _.filter(amenities, (el) => { return el.name == 'Covered' })[0].id,
                ]
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.findSlots.nodes.filter((slot) => slot.inAmenities === true).length.should.equal(2)
          })
      })

      it('Find slots by owner_id / Stacked with amenities AND sizes filter', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 5000,
                ownerId: 'fbc0cc53-602b-4ab6-b65a-fe8e60c57a09',
                slotAmenities: [
                  _.filter(amenities, (el) => { return el.name == 'Covered' })[0].id
                ],
                vehicleSizes: [vehicle_sizes[1].id]
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            // there are 2 slots owned by that person with the same amenity
            r.body.data.findSlots.nodes.filter((slot) => slot.inAmenities === true).length.should.equal(2)
            r.body.data.findSlots.nodes.filter((slot) => slot.inVs === true).length.should.equal(1)
          })
      })
    })

    describe('Check if soft-deleted records show up in resultset', () => {
      let _slots

      it('Find free slots in distance 5km', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 5000,
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            _slots = r.body.data.findSlots.nodes
            _slots.length.should.equal(7)
          })
      })

      it('Soft-Delete 1 slot from list', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: slotGqlRepo.mutations.slot.delete,
            variables: {
              id: _slots[0].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            // RLS over soft delete
            should(r.body.data.deleteSlot).be.exactly(null)
          })
      })

      it('Check if deleted slot is returned', done => {
        test.graphService()
          .send({
            query: queries['find-slots'],
            variables: {
              payload: {
                latitude: centerPoint.latitude,
                longitude: centerPoint.longitude,
                distance: 5000,
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.findSlots.nodes.length.should.equal(6)
          })
      })
    })
  })
})
