import path from 'path'
const _ = require('lodash')

describe('CRUD - api.vehicle', () => {

  let gqlrepo = require(path.join(process.cwd(), 'test/api/vehicle/vehicle.gqlrepo.js'))
  let users = {}
  let vehicles = []

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('CREATE', () => {
    describe('anonymous', () => {
      it('Try to create', (done) => {
        test.graphService()
          .send({
            query: gqlrepo.mutations.create,
            variables: gqlrepo.variables.nissan()
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('Create', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.create,
            variables: gqlrepo.variables.nissan()
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.createVehicle.vehicle.name.should.equal('Nissan gtr')
            r.body.data.createVehicle.vehicle.ownerId.should.equal(users['test_single_member'].me.id)

            vehicles['member_nissan_0'] = r.body.data.createVehicle.vehicle
          })
      })

      it('Create', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.create,
            variables: gqlrepo.variables.nissan('honda')
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.createVehicle.vehicle.name.should.equal('honda')
            r.body.data.createVehicle.vehicle.ownerId.should.equal(users['test_single_member'].me.id)

            vehicles['member_honda_0'] = r.body.data.createVehicle.vehicle
          })
      })

    })

    describe('test_super_admin', () => {
      it('Create as self / super_admin', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.create,
            variables: gqlrepo.variables.nissan()
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.createVehicle.vehicle.name.should.equal('Nissan gtr')
            r.body.data.createVehicle.vehicle.ownerId.should.equal(users['test_super_admin'].me.id)

            vehicles['admin_nissan_0'] = r.body.data.createVehicle.vehicle
          })
      })

      it('Create for base_single', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.create,
            variables: _.merge(
              gqlrepo.variables.nissan(),
              {
                vehicle: {
                  ownerId: users['test_single_member'].me.id
                }
              }
            )
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.createVehicle.vehicle.name.should.equal('Nissan gtr')
            r.body.data.createVehicle.vehicle.ownerId.should.equal(users['test_single_member'].me.id)

            vehicles['member_nissan_1'] = r.body.data.createVehicle.vehicle
          })
      })
    })
  })

  describe('GET', () => {
    describe('anonymous', () => {
      it('list-all', (done) => {
        test.graphService()
          .send({ query: gqlrepo.queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('list-all', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({ query: gqlrepo.queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.data.vehiclesList.length.should.equal(3)
          })
      })
    })

    describe('test_super_admin', () => {
      it('list-all', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({ query: gqlrepo.queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.data.vehiclesList.length.should.equal(4)
          })
      })
    })
  })

  describe('UPDATE', () => {
    describe('anonymous', () => {
      it('try to update', (done) => {
        test.graphService()
          .send({
            query: gqlrepo.mutations.update,
            variables: {
              id: vehicles['member_nissan_0'].id,
              patch: gqlrepo.variables.nissan('skyline').vehicle
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('Update own vehicle', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.update,
            variables: {
              id: vehicles['member_nissan_0'].id,
              patch: {
                name: 'skyline'
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.updateVehicle.vehicle.name.should.equal('skyline')
            r.body.data.updateVehicle.vehicle.ownerId.should.equal(users['test_single_member'].me.id)
          })
      })

      it('Try to update foreign row', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.update,
            variables: {
              id: vehicles['member_nissan_0'].id,
              patch: {
                ownerId: users['test_super_admin'].me.id,
                name: 'skyline'
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
      it('Update own', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.update,
            variables: {
              id: vehicles['admin_nissan_0'].id,
              patch: {
                name: 'silvia'
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.updateVehicle.vehicle.name.should.equal('silvia')
            r.body.data.updateVehicle.vehicle.ownerId.should.equal(users['test_super_admin'].me.id)
          })
      })

      it('Update users row', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.update,
            variables: {
              id: vehicles['member_nissan_1'].id,
              patch: {
                name: 'micra'
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.updateVehicle.vehicle.name.should.equal('micra')
            r.body.data.updateVehicle.vehicle.ownerId.should.equal(users['test_single_member'].me.id)
          })
      })

      it('Change owner of user row', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.update,
            variables: {
              id: vehicles['member_nissan_1'].id,
              patch: {
                ownerId: users['test_super_admin'].me.id,
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.updateVehicle.vehicle.ownerId.should.equal(users['test_super_admin'].me.id)
          })
      })
    })
  })

  describe('DELETE', () => {
    describe('anonymous', () => {
      it('Try to delete', (done) => {
        test.graphService()
          .send({
            query: gqlrepo.mutations.delete,
            variables: {
              id: vehicles['member_nissan_0'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('Delete own', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.delete,
            variables: {
              id: vehicles['member_nissan_0'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.deleteVehicle.vehicle.id.should.equal(vehicles['member_nissan_0'].id)
          })
      })

      it('Try to Delete foreign row', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.delete,
            variables: {
              id: vehicles['admin_nissan_0'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_super_admin', () => {
      it('Delete own', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.delete,
            variables: {
              id: vehicles['admin_nissan_0'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.deleteVehicle.vehicle.id.should.equal(vehicles['admin_nissan_0'].id)
          })
      })

      it('Delete users row', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.delete,
            variables: {
              id: vehicles['member_honda_0'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.deleteVehicle.vehicle.id.should.equal(vehicles['member_honda_0'].id)
          })
      })

      it('User should get 0', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({ query: gqlrepo.queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.data.vehiclesList.length.should.equal(0)
          })
      })

      it('Admin list all', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({ query: gqlrepo.queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.data.vehiclesList.length.should.equal(1)
          })
      })
    })
  })
})
