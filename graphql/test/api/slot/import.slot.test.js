import path from 'path'
const _ = require('lodash')

describe('Batch import - Slots', () => {
  let gqlrepo = require(path.join(process.cwd(), 'test/api/slot/slot.gqlrepo.js'))
  let vehicleSizeGqlrepo = require(path.join(process.cwd(), 'test/api/vehicle/size/vehicle_size.gqlrepo.js'))
  let users = {}
  let slots = []
  let amenities = []
  let vehicle_sizes = []
  let createGeomPoint = (coordinates) => {
    return {
      type: 'Point',
      coordinates: coordinates,
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:EPSG::4326"
        }
      }
    }
  }

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('Prepare test data', () => {
    it('Get all amenities', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.queries.list_all_amenities
        })
        .expect(200, done)
        .expect(r => {
          amenities = r.body.data.amenitiesList
        })
    })

    it('Get all vehicle_sizes', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({ query: vehicleSizeGqlrepo.queries.list.all })
        .expect(200, done)
        .expect(r => {
          vehicle_sizes = r.body.data.vehicleSizesList
        })
    })
  })

  describe('Batch Import from JSON', () => {
    describe('test_single_member', () => {
      it('createSlot - multiple nested mutations [provide amenities]', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send([
            {
              query: gqlrepo.mutations.slot.create,
              variables: {
                payload: {
                  slot: {
                    name: 'Temp Slot 1',
                    vehicleSizeId: vehicle_sizes[0].id,
                    pricePerHour: 500,
                    location: createGeomPoint([23.325264751911163, 42.70777315898353]),
                    slotAmenitiesUsingId: {
                      create: [
                        {
                          amenityId: amenities[0].id
                        },
                        {
                          amenityId: amenities[1].id
                        },
                      ]
                    }
                  }
                }
              }
            },
            {
              query: gqlrepo.mutations.slot.create,
              variables: {
                payload: {
                  slot: {
                    name: 'Temp Slot 2',
                    vehicleSizeId: vehicle_sizes[1].id,
                    pricePerHour: 200,
                    location: createGeomPoint([23.325264751911163, 42.70777315898353]),
                    slotAmenitiesUsingId: {
                      create: [
                        {
                          amenityId: amenities[0].id
                        },
                      ]
                    }
                  }
                }
              }
            }
          ])
          .expect(200, done)
          .expect(r => {
            // Two slots are created
            r.body.length.should.equal(2)
            r.body[0].data.createSlot.slot.name.should.equal('Temp Slot 1')
            r.body[0].data.createSlot.slot.ownerId.should.equal(users['test_single_member'].me.id)
            r.body[0].data.createSlot.slot.status.should.equal('ENABLED')

            r.body[1].data.createSlot.slot.name.should.equal('Temp Slot 2')
            r.body[1].data.createSlot.slot.ownerId.should.equal(users['test_single_member'].me.id)
            r.body[1].data.createSlot.slot.status.should.equal('ENABLED')
          })
      })

      it('createSlot - minimum values required', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send([
            {
              query: gqlrepo.mutations.slot.create,
              variables: {
                payload: {
                  slot: {
                    name: 'Temp Slot 3',
                    vehicleSizeId: vehicle_sizes[0].id,
                    pricePerHour: 500,
                    location: createGeomPoint([23.325264751911163, 42.70777315898353]),
                  }
                }
              }
            },
            {
              query: gqlrepo.mutations.slot.create,
              variables: {
                payload: {
                  slot: {
                    name: 'Temp Slot 4',
                    vehicleSizeId: vehicle_sizes[1].id,
                    pricePerHour: 200,
                    location: createGeomPoint([23.325264751911163, 42.70777315898353]),
                  }
                }
              }
            }
          ])
          .expect(200, done)
          .expect(r => {
            // Two slots are created
            r.body.length.should.equal(2)
            r.body[0].data.createSlot.slot.name.should.equal('Temp Slot 3')
            r.body[0].data.createSlot.slot.ownerId.should.equal(users['test_single_member'].me.id)

            r.body[1].data.createSlot.slot.name.should.equal('Temp Slot 4')
            r.body[1].data.createSlot.slot.ownerId.should.equal(users['test_single_member'].me.id)
          })
      })
    })
  })

  describe('EDGE CASE 1 - Unique slug generation', () => {
    describe('test_single_member', () => {
      it('Create slots with equal name', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send([
            {
              query: gqlrepo.mutations.slot.create,
              variables: {
                payload: {
                  slot: {
                    name: 'Temp Slot 5',
                    vehicleSizeId: vehicle_sizes[0].id,
                    pricePerHour: 5,
                    location: createGeomPoint([23.325264751911163, 42.70777315898353]),
                  }
                }
              }
            },
            {
              query: gqlrepo.mutations.slot.create,
              variables: {
                payload: {
                  slot: {
                    name: 'Temp Slot 5',
                    vehicleSizeId: vehicle_sizes[1].id,
                    pricePerHour: 5,
                    location: createGeomPoint([23.325264751911163, 42.70777315898353]),
                  }
                }
              }
            }
          ])
          .expect(200, done)
          .expect(r => {
            // Two slots are created
            r.body.length.should.equal(2)
            r.body[0].data.createSlot.slot.name.should.equal('Temp Slot 5')
            r.body[0].data.createSlot.slot.slug.should.match(/temp-slot-5/)

            r.body[1].data.createSlot.slot.name.should.equal('Temp Slot 5')
            r.body[1].data.createSlot.slot.slug.should.match(/temp-slot-5/)
          })
      })
    })
  })
})
