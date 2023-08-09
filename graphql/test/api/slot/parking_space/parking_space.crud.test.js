import {
  parking_space as psGqlrepo,
} from '/shared/gqlrepo.js'

describe('Parking Space (Crud)', () => {
  let users = {}
  let parking_spaces = []

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('CREATE', () => {
    describe('anonymous', () => {
      it('try to create', (done) => {
        test.graphService()
          .send({
            query: psGqlrepo.mutations.create,
            variables: psGqlrepo.variables.supermarket(users['test_single_member'])
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
            query: psGqlrepo.mutations.create,
            variables: psGqlrepo.variables.supermarket(users['test_single_member'])
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('app_provider_premium', () => {
      it('create', (done) => {
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
    })

    describe('test_super_admin', () => {
      it('create', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: psGqlrepo.mutations.create,
            variables: psGqlrepo.variables.supermarket(users['test_super_admin'])
          })
          .expect(200, done)
          .expect(r => {
            let _obj = r.body.data.createParkingSpace.parkingSpace
            _obj.ownerId.should.equal(users['test_super_admin'].me.id)

            parking_spaces['admin1'] = _obj
          })
      })

      it('create on behalf of app_provider_premium', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: psGqlrepo.mutations.create,
            variables: psGqlrepo.variables.supermarket(users['test_provider_premium'])
          })
          .expect(200, done)
          .expect(r => {
            let _obj = r.body.data.createParkingSpace.parkingSpace
            _obj.ownerId.should.equal(users['test_provider_premium'].me.id)

            parking_spaces['provider2'] = _obj
          })
      })
    })
  })

  describe('GET', () => {
    describe('anonymous', () => {
      it('list all', (done) => {
        test.graphService()
          .send({
            query: psGqlrepo.queries.list_parking_spaces,
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.parkingSpacesList.length.should.equal(3)
          })
      })
    })

    describe('test_single_member', () => {
      it('list all', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: psGqlrepo.queries.list_parking_spaces,
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.parkingSpacesList.length.should.equal(3)
          })
      })
    })

    describe('test_super_admin', () => {
      it('list all', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: psGqlrepo.queries.list_parking_spaces,
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.parkingSpacesList.length.should.equal(3)
          })
      })
    })
  })

  describe('UPDATE', () => {
    describe('anonymous', () => {
      it('try to update', (done) => {
        test.graphService()
          .send({
            query: psGqlrepo.mutations.update,
            variables: {
              id: parking_spaces['provider1'].id,
              patch: {
                name: 'anonymous renamed'
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
      it('try to update not own ps', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: psGqlrepo.mutations.update,
            variables: {
              id: parking_spaces['provider1'].id,
              patch: {
                name: 'test_single_member renamed'
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_provider_premium', () => {
      it('update', (done) => {
        test.graphService()
          .authorize(users['test_provider_premium'])
          .send({
            query: psGqlrepo.mutations.update,
            variables: {
              id: parking_spaces['provider1'].id,
              patch: {
                name: 'new_name'
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            let _obj = r.body.data.updateParkingSpace.parkingSpace
            _obj.ownerId.should.equal(users['test_provider_premium'].me.id)
            _obj.name.should.equal('new_name')

            parking_spaces['provider1'] = _obj
          })
      })
    })

    describe('test_super_admin', () => {
      it('update', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: psGqlrepo.mutations.update,
            variables: {
              id: parking_spaces['provider2'].id,
              patch: {
                name: 'new_name'
              }
            }
          })
          .expect(200, done)
          .expect(r => {
            let _obj = r.body.data.updateParkingSpace.parkingSpace
            _obj.ownerId.should.equal(users['test_provider_premium'].me.id)
            _obj.name.should.equal('new_name')

            parking_spaces['provider2'] = _obj
          })
      })
    })
  })

  describe('DELETE', () => {
    describe('anonymous', () => {
      it('try to delete', (done) => {
        test.graphService()
          .send({
            query: psGqlrepo.mutations.delete,
            variables: {
              id: parking_spaces['provider1'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('try to delete', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: psGqlrepo.mutations.delete,
            variables: {
              id: parking_spaces['provider1'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_provider_premium', () => {
      it('delete', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: psGqlrepo.mutations.delete,
            variables: {
              id: parking_spaces['provider1'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            // RLS over soft delete
            should(r.body.data.deleteParkingSpace).be.exactly(null)
          })
      })
    })

    describe('test_super_admin', () => {
      it('delete providers ps', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: psGqlrepo.mutations.delete,
            variables: {
              id: parking_spaces['provider2'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            // RLS over soft delete
            should(r.body.data.deleteParkingSpace).be.exactly(null)
          })
      })

      it('delete', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: psGqlrepo.mutations.delete,
            variables: {
              id: parking_spaces['admin1'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            // RLS over soft delete
            should(r.body.data.deleteParkingSpace).be.exactly(null)
          })
      })

      it('check for deleted parking spaces', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: psGqlrepo.queries.list_parking_spaces,
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.parkingSpacesList.length.should.equal(3)
          })
      })
    })
  })
})
