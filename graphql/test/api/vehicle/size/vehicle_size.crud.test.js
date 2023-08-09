import path from 'path'
const _ = require('lodash')

describe('CRUD - api.vehicle_size', () => {

  let gqlrepo = require(path.join(process.cwd(), 'test/api/vehicle/size/vehicle_size.gqlrepo.js'))
  let users = {}
  let vehicle_sizes = []

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
            variables: gqlrepo.variables.small()
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('Try to Create', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.create,
            variables: gqlrepo.variables.small()
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_super_admin', () => {
      it('Create small vehicle size', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.create,
            variables: gqlrepo.variables.small()
          })
          .expect(200, done)
          .expect(r => {
            let resObj = r.body.data.createVehicleSize.vehicleSize
            resObj.name.should.equal('Test Small')
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
            r.body.data.vehicleSizesList.length.should.equal(4)
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
            r.body.data.vehicleSizesList.length.should.equal(4)
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
            r.body.data.vehicleSizesList.length.should.equal(4)

            _.each(r.body.data.vehicleSizesList, (type) => {
              vehicle_sizes[_.snakeCase(type.name)] = type
            })
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
              id: vehicle_sizes['test_small'].id,
              patch: gqlrepo.variables.small('New Name').vehicleSize
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('try to update', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.update,
            variables: {
              id: vehicle_sizes['test_small'].id,
              patch: gqlrepo.variables.small('New Name').vehicleSize
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_super_admin', () => {
      it('update', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.update,
            variables: {
              id: vehicle_sizes['test_small'].id,
              patch: gqlrepo.variables.small('New Name').vehicleSize
            }
          })
          .expect(200, done)
          .expect(r => {
            let resObj = r.body.data.updateVehicleSize.vehicleSize
            resObj.name.should.equal('New Name')
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
              id: vehicle_sizes['test_small'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('Try to delete', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.delete,
            variables: {
              id: vehicle_sizes['test_small'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_super_admin', () => {
      it('Delete', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.delete,
            variables: {
              id: vehicle_sizes['test_small'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.deleteVehicleSize.vehicleSize.id.should.equal(vehicle_sizes['test_small'].id)
          })
      })

      it('List should containt one less record', (done) => {
        test.graphService()
          .send({ query: gqlrepo.queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.data.vehicleSizesList.length.should.equal(3)
          })
      })
    })
  })
})
