import path from 'path'
const _ = require('lodash')

describe('CRUD - api.slot_availability', () => {

  let gqlrepo = require(path.join(process.cwd(), 'test/api/slot/slot.gqlrepo.js'))
  let vehicleSizeRepo = require(path.join(process.cwd(), 'test/api/vehicle/size/vehicle_size.gqlrepo.js'))
  let users = {}
  let slots = []
  let avails = []
  let vehicle_sizes = []

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('Prepare test data', () => {
    it('Get all vehicle_sizes', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({ query: vehicleSizeRepo.queries.list.all })
        .expect(200, done)
        .expect(r => {
          vehicle_sizes = r.body.data.vehicleSizesList
        })
    })

    it('Create slot', (done) => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.slot.create,
          variables: gqlrepo.variables.slot.create_slot_no_amenities(users['test_single_member'], vehicle_sizes[0].id
          )
        })
        .expect(200, done)
        .expect(r => {
          slots['test_1'] = r.body.data.createSlot.slot
        })
    })
  })

  describe('Create', () => {
    describe('anonymous', () => {
      it('try to create', (done) => {
        test.graphService()
          .send({
            query: gqlrepo.mutations.availability.create,
            variables: gqlrepo.variables.availability.create_12_18(slots['test_1'], 1)
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('Try to create availability with end_hour less than starty', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.availability.create,
            variables: {
               payload: {
                slotAvailability: {
                  slotId: slots['test_1'].id,
                  dayOfWeek: 2,
                  startHour: '12:00:00',
                  endHour: '11:00:00',
                },
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors[0].constraint.should.equal('start_hour_not_less_than_end_hour')
          })
      })

      it('Create availability for own slot', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.availability.create,
            variables: gqlrepo.variables.availability.create_12_18(slots['test_1'],1)
          })
          .expect(200, done)
          .expect(r => {
            let resObj = r.body.data.createSlotAvailability.slotAvailability
            resObj.slotId.should.equal(slots['test_1'].id)
            resObj.dayOfWeek.should.equal(1)
            resObj.startHour.should.equal('12:00:00')
            resObj.endHour.should.equal('18:00:00')
          })
      })
    })
  })
})
