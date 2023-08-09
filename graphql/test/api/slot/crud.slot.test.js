import {
  slot as gqlrepo,
  vehicle_size as vehicleSizeGqlrepo,
  parking_space as psGqlrepo
} from '/shared/gqlrepo.js'
const _ = require('lodash')

describe('CRUD - Slots', () => {
  let users = {}
  let slots = []
  let amenities = []
  let vehicle_sizes = []
  let parking_spaces = []

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

  describe('CREATE', () => {
    describe('anonymous', () => {
      it('try to create', (done) => {
        test.graphService()
          .send({
            query: gqlrepo.mutations.slot.create,
            variables: gqlrepo.variables.slot.create_slot_1(users['test_single_member'], amenities, vehicle_sizes[0].id)
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('create', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.slot.create,
            variables: gqlrepo.variables.slot.create_slot_1(users['test_single_member'], amenities, vehicle_sizes[0].id)
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.createSlot.slot.ownerId.should.equal(users['test_single_member'].me.id)
            r.body.data.createSlot.slot.status.should.equal('ENABLED')
            slots['test_single_member'] = r.body.data.createSlot.slot
          })
      })
    })

    describe('test_super_admin', () => {
      it('create disabled slot', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.slot.create,
            variables: gqlrepo.variables.slot.create_slot_no_amenities(
              users['test_super_admin'],
              vehicle_sizes[0].id,
              'DISABLED'
            )
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.createSlot.slot.ownerId.should.equal(users['test_super_admin'].me.id)
            r.body.data.createSlot.slot.status.should.equal('DISABLED')
            r.body.data.createSlot.slot.verificationStatus.should.equal('VERIFIED')
            slots['test_super_admin'] = r.body.data.createSlot.slot
          })
      })
    })

    describe('Pricing w/ test_single_member', () => {
      it('Try to create with price_per_hour = 0.5', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.slot.create,
            variables: gqlrepo.variables.slot.create_slot_1(
              users['test_single_member'],
              amenities,
              vehicle_sizes[0].id,
              0.5
            )
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
            r.body.errors[0].constraint.should.equal('slot_pricing_more_than_1')
          })
      })

      let price_slot_at_0 = {}

      it('Create with price_per_hour = 0', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.slot.create,
            variables: gqlrepo.variables.slot.create_slot_1(
              users['test_single_member'],
              amenities,
              vehicle_sizes[0].id,
              0
            )
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.createSlot.slot.ownerId.should.equal(users['test_single_member'].me.id)
            r.body.data.createSlot.slot.pricePerHour.should.equal('0')

            price_slot_at_0 = r.body.data.createSlot.slot
          })
      })

      it('delete current test slots', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.slot.delete,
            variables: {
              id: price_slot_at_0.id,
            },
          })
          .expect(200, done)
          .expect(r => {
            // RLS over soft delete
            should(r.body.data.deleteSlot).be.exactly(null)
          })
      })
    })

    describe('app_provider_premium', () => {
      it('create parking space', (done) => {
        test.graphService()
          .authorize(users['test_provider_premium'])
          .send({
            query: psGqlrepo.mutations.create,
            variables: psGqlrepo.variables.supermarket(users['test_provider_premium'])
          })
          .expect(200, done)
          .expect(r => {
            let _obj = r.body.data.createParkingSpace.parkingSpace
            _obj.ownerId.should.equal(users['test_provider_premium'].me.id)
            _obj.name.should.equal(psGqlrepo.variables.supermarket(users['test_provider_premium']).payload.parkingSpace.name)

            parking_spaces['provider1'] = _obj
          })
      })

      it('create slot with parking_space_id', (done) => {
        test.graphService()
          .authorize(users['test_provider_premium'])
          .send({
            query: gqlrepo.mutations.slot.create,
            variables: gqlrepo.variables.slot.create_slot_no_amenities(
              users['test_provider_premium'],
              vehicle_sizes[0].id,
              'DISABLED',
              parking_spaces['provider1'].id
            )
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.createSlot.slot.ownerId.should.equal(users['test_provider_premium'].me.id)
            r.body.data.createSlot.slot.parkingSpaceId.should.equal(parking_spaces['provider1'].id)
            r.body.data.createSlot.slot.status.should.equal('DISABLED')
            slots['test_provider_premium'] = r.body.data.createSlot.slot
          })
      })
    })
  })

  describe('GET', () => {
    describe('anonymous', () => {
      it('list all', (done) => {
        test.graphService()
          .send({
            query: gqlrepo.queries.list_slots,
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotsList.length.should.equal(13)
          })
      })
    })

    describe('test_single_member', () => {
      it('list all', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.queries.list_slots,
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotsList.length.should.equal(13)
          })
      })
    })

    describe('test_super_admin', () => {
      it('list all', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.queries.list_slots,
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotsList.length.should.equal(13)
          })
      })
    })
  })

  describe('UPDATE', () => {
    describe('anonymous', () => {
      it('try to update', (done) => {
        test.graphService()
          .send({
            query: gqlrepo.mutations.slot.update,
            variables: {
              id: slots['test_single_member'].id,
              patch: {
                name: 'anonymous renamed',
                status: 'DISABLED'
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('update to disabled', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.slot.update,
            variables: {
              id: slots['test_single_member'].id,
              patch: {
                name: 'test_single_member renamed',
                status: 'DISABLED'
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.updateSlot.slot.name.should.equal('test_single_member renamed')
            r.body.data.updateSlot.slot.ownerId.should.equal(users['test_single_member'].me.id)
            r.body.data.updateSlot.slot.status.should.equal('DISABLED')
            slots['test_single_member'] = r.body.data.updateSlot.slot
          })
      })

      it('update verification status to verified', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.slot.update,
            variables: {
              id: slots['test_single_member'].id,
              patch: {
                verificationStatus: 'VERIFIED'
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })

      it('try to update another slot', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.slot.update,
            variables: {
              id: slots['test_super_admin'].id,
              patch: {
                ownerId: users['test_single_member'].me.id,
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            // RLS restriction to change ownerId
            should(r.body.data.updateSlot.slot).be.exactly(null)
          })
      })

      it('try to update another slot verification', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.slot.update,
            variables: {
              id: slots['test_super_admin'].id,
              patch: {
                verificationStatus: 'VERIFIED'
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
            r.body.errors[0].code.should.equal('42501')
          })
      })
    })

    describe('test_super_admin', () => {
      it('update', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.slot.update,
            variables: {
              id: slots['test_super_admin'].id,
              patch: {
                name: 'test_super_admin renamed',
                status: 'DISABLED'
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.updateSlot.slot.name.should.equal('test_super_admin renamed')
            r.body.data.updateSlot.slot.ownerId.should.equal(users['test_super_admin'].me.id)
            r.body.data.updateSlot.slot.status.should.equal('DISABLED')
            slots['test_super_admin'] = r.body.data.updateSlot.slot
          })
      })

      it('update verification status', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.slot.update,
            variables: {
              id: slots['test_super_admin'].id,
              patch: {
                verificationStatus: 'REJECTED'
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.updateSlot.slot.verificationStatus.should.equal('REJECTED')
            slots['test_super_admin'] = r.body.data.updateSlot.slot
          })
      })
    })
  })

  describe('GET after DELETE', () => {
    describe('anonymous', () => {
      it('list all', (done) => {
        test.graphService()
          .send({
            query: gqlrepo.queries.list_slots,
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotsList.length.should.equal(13)
          })
      })
    })

    describe('test_single_member', () => {
      it('list all', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.queries.list_slots,
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotsList.length.should.equal(13)
          })
      })
    })

    describe('test_super_admin', () => {
      it('list all', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.queries.list_slots,
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotsList.length.should.equal(13)
          })
      })
    })
  })

  describe('DELETE', () => {
    describe('anonymous', () => {
      it('try to delete', (done) => {
        test.graphService()
          .send({
            query: gqlrepo.mutations.slot.delete,
            variables: {
              id: slots['test_super_admin'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('delete own slot', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.slot.delete,
            variables: {
              id: '9a6b9c44-2221-49a0-bd5f-0eefcd3f8f4e',
            },
          })
          .expect(200, done)
          .expect(r => {
            // RLS over soft delete
            should(r.body.data.deleteSlot).be.exactly(null)
          })
      })
    })

    describe('test_super_admin', () => {
      it('delete own slot', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.slot.delete,
            variables: {
              id: slots['test_super_admin'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            // RLS over soft delete
            should(r.body.data.deleteSlot).be.exactly(null)
          })
      })

      it('delete single member slot', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.slot.delete,
            variables: {
              id: '20bd49df-c1df-444d-82cf-8b6435de07ac',
            },
          })
          .expect(200, done)
          .expect(r => {
            // RLS over soft delete
            should(r.body.data.deleteSlot).be.exactly(null)
          })
      })
    })
  })

  describe('GET', () => {
    describe('anonymous', () => {
      it('list all', (done) => {
        test.graphService()
          .send({
            query: gqlrepo.queries.list_slots,
          })
          .expect(200, done)
          .expect(r => {
            const slots = r.body.data.slotsList
            slots.length.should.equal(10)
            slots.filter((slot) => slot.status === 'ENABLED').length.should.equal(6)
            slots.filter((slot) => slot.status === 'UNLISTED').length.should.equal(1)
            slots.filter((slot) => slot.status === 'DISABLED').length.should.equal(3)
          })
      })
    })

    describe('test_single_member', () => {
      it('list all', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.queries.list_slots,
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotsList.length.should.equal(10)
          })
      })
    })

    describe('test_super_admin', () => {
      it('list all', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.queries.list_slots,
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.slotsList.length.should.equal(10)
          })
      })
    })
  })
})
