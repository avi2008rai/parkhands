import path from 'path'

describe('api.me()', () => {

  let gqlrepo = require(path.join(process.cwd(), 'test/api/user/user.gqlrepo.js'))

  let users = []
  let testUsers = []
  let jwtTokens = []

  let me_keys = [
    'id'
    , 'name'
    , 'role'
    , 'role'
    , 'email'
    , 'phone'
    , 'status'
    , 'address'
    , 'settings'
    , 'photo_url'
    , 'billing_profile'
    , 'user_subscriptions'
  ]

  let me_bp_keys = [
    'id'
    , 'customer_id'
    , 'billing_details'
    , 'created_at'
    , 'updated_at'
  ]

  let me_us_keys = [
    'id'
    , 'billing_profile_id'
    , 'plan_subscription_id'
    , 'status'
    , 'ends_at'
    , 'created_at'
    , 'updated_at'
  ]

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('Check for keys on resultset', () => {
    it('Get me', (done) => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({ query: gqlrepo.queries.me })
        .expect(200, done)
        .expect(r => {
          let obj = r.body.data.me
          let bp = obj.billing_profile
          let us = obj.user_subscriptions

          obj.should.have.only.properties(me_keys)
          bp.should.have.only.properties(me_bp_keys)
          us.should.have.only.properties(me_us_keys)
        })
    })
  })

  describe('Get user premium status', () => {
    it('Check premium for test_provider_premium', (done) => {
      test.graphService()
        .send({
          query: gqlrepo.queries.user_premium,
          variables: {
            user_id: users['test_provider_premium'].me.id
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.userPremium.should.equals(true)
        })
    })

    it('Check premium for test_super_admin', (done) => {
      test.graphService()
        .send({
          query: gqlrepo.queries.user_premium,
          variables: {
            user_id: users['test_super_admin'].me.id
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.userPremium.should.equals(false)
        })
    })

    it('Check premium for test_single_member', (done) => {
      test.graphService()
        .send({
          query: gqlrepo.queries.user_premium,
          variables: {
            user_id: users['test_single_member'].me.id
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.userPremium.should.equals(false)
        })
    })

    it('Check premium for test_provider', (done) => {
      test.graphService()
        .send({
          query: gqlrepo.queries.user_premium,
          variables: {
            user_id: users['test_provider'].me.id
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.userPremium.should.equals(false)
        })
    })
  })
})


