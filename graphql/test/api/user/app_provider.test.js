import path from 'path'

describe('Provider roles basic auth', () => {

  let gqlrepo = require(path.join(process.cwd(), 'test/api/user/user.gqlrepo.js'))

  let users = []
  let testUsers = []
  let jwtTokens = []

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  xdescribe('Register single member / Pay / Upgrade to provider', () => {
  })

  describe('Create / app_provider', () => {
    it('Create', (done) => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({ query: gqlrepo.mutations.create,
          variables: {
            payload: {
              name: 'Biznis Kowalsky',
              email: 'kowalsky@parkhands.de',
              role: 'app_provider',
            }
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.createUser.user.role.should.equal('app_provider')

          testUsers['admin_created_provider'] = r.body.data.createUser.user
        })
    })

    describe('Activate and login', () => {
      let userJWT, loginJWT

      before('Get user token from pg_table', async () => {
        userJWT = await test.db.query(`
          SELECT
            payload->>'activation_token' as token
          FROM
            private.pg_event
          WHERE
            event_key = 'user.insert'
          AND
            payload->'user'->>'id' = '${testUsers['admin_created_provider'].id}'
          ;
        `)

        userJWT = userJWT[0].token
      })

      // There is not way to extract jwt needed from an endpoint
      it('Activate user', (done) => {
        test.graphService()
          .set('Authorization', 'Bearer ' + userJWT)
          .send({ query: gqlrepo.mutations.activate,
            variables: {
              payload: {
                password: '12345678',
                password2: '12345678',
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.activateUser.should.have.property('jwtToken')
            loginJWT = r.body.data.activateUser.jwtToken
          })
      })

      it('Login', (done) => {
        test.graphService()
          .send({
            query: gqlrepo.mutations.login,
            variables: {
              payload: {
                email: 'kowalsky@parkhands.de',
                password: '12345678'
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.login.jwtToken.length.should.be.above(0)
          })
      })
    })
  })

  describe('Create / app_provider_premium', () => {
    it('Create', (done) => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({ query: gqlrepo.mutations.create,
          variables: {
            payload: {
              name: 'Premium Testoff',
              email: 'premium@parkhands.de',
              role: 'app_provider_premium',
            }
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.createUser.user.role.should.equal('app_provider_premium')

          testUsers['admin_created_provider_premium'] = r.body.data.createUser.user
        })
    })

    describe('Activate and login', () => {
      let userJWT, loginJWT

      before('Get user token from pg_table', async () => {
        userJWT = await test.db.query(`
          SELECT
            payload->>'activation_token' as token
          FROM
            private.pg_event
          WHERE
            event_key = 'user.insert'
          AND
            payload->'user'->>'id' = '${testUsers['admin_created_provider_premium'].id}'
          ;
        `)

        userJWT = userJWT[0].token
      })

      // There is not way to extract jwt needed from an endpoint
      it('Activate user', (done) => {
        test.graphService()
          .set('Authorization', 'Bearer ' + userJWT)
          .send({ query: gqlrepo.mutations.activate,
            variables: {
              payload: {
                password: '12345678',
                password2: '12345678',
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.activateUser.should.have.property('jwtToken')
            loginJWT = r.body.data.activateUser.jwtToken
          })
      })

      it('Login', (done) => {
        test.graphService()
          .send({
            query: gqlrepo.mutations.login,
            variables: {
              payload: {
                email: 'premium@parkhands.de',
                password: '12345678'
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.login.jwtToken.length.should.be.above(0)
          })
      })
    })
  })
})
