const path = require('path')
const _ = require('lodash')

describe('Soft delete Users', () => {

  let userGqlRepo = require(path.join(process.cwd(), 'test/api/user/user.gqlrepo.js'))
  let vehicleGqlRepo = require(path.join(process.cwd(), 'test/api/vehicle/vehicle.gqlrepo.js'))
  let slotGqlRepo = require(path.join(process.cwd(), 'test/api/slot/slot.gqlrepo.js'))

  let users = []
  let userToDelete = {}
  let jwtTokens = []

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  before('Prepare full user', async () => {
    await test.db.test_data.test_full_user()
  })

  it('GET all Users', (done) => {
    test.graphService()
      .authorize(users['test_super_admin'])
      .send({ query: userGqlRepo.queries.usersList })
      .expect(200, done)
      .expect(r => {
        r.body.data.usersList.length.should.be.above(0)

        userToDelete = _.filter( r.body.data.usersList, { email: 'test_full_user@parkhands.de' })[0]
      })
  })

  describe('Soft Delete User AS Self', () => {
    it('Logs-in user to get its token', (done) => {
      test.graphService()
        .send({
          query: userGqlRepo.mutations.login,
          variables: {
            payload: {
              email: userToDelete.email,
              password: '12345678'
            }
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.login.jwtToken.length.should.be.above(0)

          jwtTokens[userToDelete.email] = r.body.data.login.jwtToken
        })
    })

    it('Get me', (done) => {
      test.graphService()
        .set('Authorization', `Bearer ${jwtTokens[userToDelete.email]}`)
        .send({ query: userGqlRepo.queries.me })
        .expect(200, done)
        .expect(r => {
          r.body.data.me.email.should.equals(userToDelete.email)

          userToDelete = r.body.data.me
        })
    })

    it('Delete', (done) => {
      test.graphService()
        .set('Authorization', `Bearer ${jwtTokens[userToDelete.email]}`)
        .send({
          query: userGqlRepo.mutations.delete,
          variables: { id: userToDelete.id },
        })
        .expect(200, done)
        .expect(r => {
          should(r.body.data.deleteUser).be.exactly(null)
        })
    })

    it('Check for deleted user', done => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({
          query: userGqlRepo.queries.usersList,
        })
        .expect(200, done)
        .expect(r => {
          _.filter( r.body.data.usersList, { email: userToDelete.email }).length.should.equal(0)
        })
    })

    it('Checks for users vehicles', (done) => {
      test.graphService()
        .set('Authorization', `Bearer ${jwtTokens[userToDelete.email]}`)
        .send({ query: vehicleGqlRepo.queries.list.all })
        .expect(200, done)
        .expect(r => {
          let user_vehicles = _.filter( r.body.data.vehiclesList, {
            ownerId: userToDelete.id
          })

          user_vehicles.length.should.equals(0)
        })
    })

    it('Checks for users slots', (done) => {
      test.graphService()
        .set('Authorization', `Bearer ${jwtTokens[userToDelete.email]}`)
        .send({
          query: slotGqlRepo.queries.list_slots,
        })
        .expect(200, done)
        .expect(r => {
          let user_slots = _.filter( r.body.data.slotsList, {
            ownerId: userToDelete.id
          })

          user_slots.length.should.equals(0)
        })
    })

    it('Checks for users api keys', (done) => {
      test.graphService()
        .set('Authorization', `Bearer ${jwtTokens[userToDelete.email]}`)
        .send({
          query: userGqlRepo.api.get_api_keys,
          variables: { user_id: userToDelete.id }
        })
        .expect(200, done)
        .expect(r => {
          let user_api_keys = _.filter( r.body.data.getApiKeysList, {
            ownerId: userToDelete.id
          })

          user_api_keys.length.should.equals(0)
        })
    })
  })

  describe('Soft Delete User AS SU', () => {
    before('Reset DB', async () => {
      await test.dbService.reset()
    })

    before('Prepare full user', async () => {
      await test.db.test_data.test_full_user()
    })

    it('Delete', (done) => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({
          query: userGqlRepo.mutations.delete,
          variables: { id: userToDelete.id },
        })
        .expect(200, done)
        .expect(r => {
          should(r.body.data.deleteUser).be.exactly(null)
        })
    })

    it('Check for deleted user', done => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({
          query: userGqlRepo.queries.usersList,
        })
        .expect(200, done)
        .expect(r => {
          _.filter( r.body.data.usersList, { email: userToDelete.email }).length.should.equal(0)
        })
    })

    it('Checks for users vehicles', (done) => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({ query: vehicleGqlRepo.queries.list.all })
        .expect(200, done)
        .expect(r => {
          let user_vehicles = _.filter( r.body.data.vehiclesList, {
            ownerId: userToDelete.id
          })

          user_vehicles.length.should.equals(0)
        })
    })

    it('Checks for users slots', (done) => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({
          query: slotGqlRepo.queries.list_slots,
        })
        .expect(200, done)
        .expect(r => {
          let user_slots = _.filter( r.body.data.slotsList, {
            ownerId: userToDelete.id
          })

          user_slots.length.should.equals(0)
        })
    })

    it('Checks for users api keys', (done) => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({
          query: userGqlRepo.api.get_api_keys,
          variables: { user_id: userToDelete.id }
        })
        .expect(200, done)
        .expect(r => {
          let user_api_keys = _.filter( r.body.data.getApiKeysList, {
            ownerId: userToDelete.id
          })

          user_api_keys.length.should.equals(0)
        })
    })
  })
})
