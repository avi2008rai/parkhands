import path from 'path'

describe('Reset Password', () => {

  let userGqlrepo = require(path.join(process.cwd(), 'test/api/user/user.gqlrepo.js'))

  let users = []
  let testUsers = []
  let jwtTokens = []

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('Register and reset', () => {
    it('Register', (done) => {
      test.graphService()
        .send({
          query: userGqlrepo.mutations.register,
          variables: userGqlrepo.variables.register(),
        })
        .expect(200, done)
        .expect(r => {
          // jwt string should exists
          r.body.data.register.jwtToken.length.should.be.above(0)
          jwtTokens['user_for_reset'] = r.body.data.register.jwtToken
        })
    })

    it('Try to Reset password', (done) => {
      test
        .graphService()
        .authorize({
          jwtToken: jwtTokens['user_for_reset']
        })
        .send({
          query: userGqlrepo.mutations.reset_password,
          variables: {
            payload: {
              password: 'qwerty'
            }
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
          r.body.errors[0].code.should.equal('RPA01')
        })
    })

    it('Reset password', (done) => {
      test
        .graphService()
        .authorize({
          jwtToken: jwtTokens['user_for_reset']
        })
        .send({
          query: userGqlrepo.mutations.reset_password,
          variables: {
            payload: {
              password: 'qwertyasd'
            }
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.resetPassword.boolean.should.equal(true)
        })
    })

    it('Try to Login', (done) => {
      test.graphService()
        .send({
          query: userGqlrepo.mutations.login,
          variables: {
            payload: {
              email: userGqlrepo.variables.register().payload.email,
              password: 'qwertyasd'
            }
          },
        })
        .expect(200, done)
        .expect(r => {
          // jwt string should exists
          r.body.data.login.jwtToken.length.should.be.above(0)
          jwtTokens['user_for_reset'] = r.body.data.login.jwtToken
        })
    })

    it('Check status after reset_password', (done) => {
      test.graphService()
        .authorize({
          jwtToken: jwtTokens['user_for_reset']
        })
        .send({ query: userGqlrepo.queries.me })
        .expect(200, done)
        .expect(r => {
           r.body.data.me.status.should.equal('enabled')
           testUsers['user_for_reset'] = r.body.data.me
        })
    })

    it('Disable user via super admin', (done) => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({
          query: userGqlrepo.mutations.update,
          variables: {
            payload: {
              id: testUsers['user_for_reset'].id,
              status: 'DISABLED',
            },
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.updateUser.user.status.should.equal('DISABLED')
        })

    })

    it('Try to Reset password with disabled user', (done) => {
      test
        .graphService()
        .authorize({
          jwtToken: jwtTokens['user_for_reset']
        })
        .send({
          query: userGqlrepo.mutations.reset_password,
          variables: {
            payload: {
              password: 'qwerty123'
            }
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
          r.body.errors[0].code.should.equal('PM003')
        })
    })

  })
})
