import path from 'path'
const _ = require('lodash')

describe('CRUD - api.slot_amenity', () => {

  let gqlrepo = require(path.join(process.cwd(), 'test/api/slot/slot.gqlrepo.js'))
  let vehicleSizeGqlrepo = require(path.join(process.cwd(), 'test/api/vehicle/size/vehicle_size.gqlrepo.js'))
  let users = {}
  let slots = []
  let amenities = []
  let vehicle_sizes = []

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

  describe('Add slot amenities / deleteOthers', () => {
    it('Create slot with amenities', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.slot.create,
          variables: gqlrepo.variables.slot.create_slot_1(users['test_single_member'], amenities, vehicle_sizes[0].id)
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.createSlot.slot.slotAmenitiesList.length.should.equal(3)

          slots['temp_1'] = r.body.data.createSlot.slot
        })
    })

    it('Update slot_amenity records through slot / should delete all others', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.slot.update,
          variables: gqlrepo.variables.slot.update_slot_1(slots, amenities, vehicle_sizes[0].id)
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.updateSlot.slot.slotAmenitiesList.length.should.equal(3)
        })
    })
  })
})
