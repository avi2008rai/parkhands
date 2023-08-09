import path from 'path'

describe('Users crud', () => {

  let gqlrepo = require(path.join(process.cwd(), 'test/api/user/user.gqlrepo.js'))

  let users = []
  let testUsers = []

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  it('GET all Users', (done) => {
    test.graphService()
      .authorize(users['test_super_admin'])
      .send({ query: gqlrepo.queries.usersList })
      .expect(200, done)
      .expect(r => {
        r.body.data.usersList.length.should.be.above(0)
      })
  })

  describe('Register with pass', () => {
    let regJWT

    it('Signup', (done) => {
      test.graphService()
        .send({ query: gqlrepo.mutations.register,
          variables: {
            payload: {
              email: 'bilbo@parkhands.team',
              name: 'Bilbuu Boogins',
              password: '12345678',
            }
          },
        })
        .expect(200, done)
        .expect(r => {
          // jwt string should exists
          r.body.data.register.jwtToken.length.should.be.above(0)

          regJWT = r.body.data.register.jwtToken
        })
    })

    it('Check for billing profile creation', (done) => {
      test.graphService()
        .authorize({
          jwtToken: regJWT
        })
        .send({ query: gqlrepo.queries.me })
        .expect(200, done)
        .expect(r => {
          r.body.data.me.billing_profile.id.should.exists
        })
    })

    it('Activate user with token from register', (done) => {
      test.graphService()
        .set('Authorization', 'Bearer ' + regJWT)
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
        })
    })

    it('Login', (done) => {
      test.graphService()
        .send({
          query: gqlrepo.mutations.login,
          variables: {
            payload: {
              email: 'bilbo@parkhands.team',
              password: '12345678'
            }
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.login.should.have.property('jwtToken')
        })
    })
  })

  describe('Register NO password', () => {
    let regJWT

    it('Signup without passing password', (done) => {
      test.graphService()
        .send({ query: gqlrepo.mutations.register,
          variables: {
            payload: {
              email: 'samwise@parkhands.team',
              name: 'Sam Wise',
              phone: '09987665544',
              licensePlate: 'w tt 7766'
            }
          },
        })
        .expect(200, done)
        .expect(r => {
          // jwt string should exists
          r.body.data.register.jwtToken.length.should.be.above(0)

          regJWT = r.body.data.register.jwtToken
        })
    })

    it('Activate user with token from register', (done) => {
      test.graphService()
        .set('Authorization', 'Bearer ' + regJWT)
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
        })
    })

    it('Login', (done) => {
      test.graphService()
        .send({
          query: gqlrepo.mutations.login,
          variables: {
            payload: {
              email: 'samwise@parkhands.team',
              password: '12345678'
            }
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.login.should.have.property('jwtToken')
        })
    })
  })

  describe('Create / mutation used in admin', () => {
    it('Create', (done) => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({ query: gqlrepo.mutations.create,
          variables: {
            payload: {
              name: 'Sam Wise',
              email: 'samwise@parkhands.de',
              role: 'app_single_member',
            }
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.createUser.user.name.should.equal('Sam Wise')
          r.body.data.createUser.user.email.should.equal('samwise@parkhands.de')
          r.body.data.createUser.user.role.should.equal('app_single_member')
          r.body.data.createUser.user.should.not.have.key('password')

          testUsers['admin_created_member'] = r.body.data.createUser.user
        })
    })

    it('Update', (done) => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({ query: gqlrepo.mutations.update,
          variables: {
            payload: {
              id: testUsers['admin_created_member'].id,
              name: 'Sam WiseNot',
              password: '12345678',
              role: 'app_single_member',
            }
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.updateUser.user.name.should.equal('Sam WiseNot')
          r.body.data.updateUser.user.email.should.equal('samwise@parkhands.de')
          r.body.data.updateUser.user.role.should.equal('app_single_member')
        })
    })

    it('Update address and photo', (done) => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({ query: gqlrepo.mutations.update,
          variables: {
            payload: {
              id: testUsers['admin_created_member'].id,
              photoUrl: 'https://picsum.photos/seed/picsum/200/300',
              address: {
                country: 'Germany'
                , city: 'Berlin'
                , street: '55 str'
              }
            }
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.updateUser.user.address.city.should.equal('Berlin')
          r.body.data.updateUser.user.photoUrl.should.be.not.null
        })
    })
  })

  describe('Activate user with the email token', () => {
    let userJWT

    before('Get user token from pg_table', async () => {
      userJWT = await test.db.query(`
        SELECT
          payload->>'activation_token' as token
        FROM
          private.pg_event
        WHERE
          event_key = 'user.insert'
        AND
          payload->'user'->>'id' = '${testUsers['admin_created_member'].id}'
        ;
      `)

      userJWT = userJWT[0].token
    })

    it('Try to Activate user without password', (done) => {
      test.graphService()
        .set('Authorization', 'Bearer ' + userJWT)
        .send({ query: gqlrepo.mutations.activate,
          variables: {
            payload: {
              password: null,
              password2: '12345678',
            }
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
          r.body.errors[0].message.should.equals('password_missing')
        })
    })

    it('Try to Activate with mismatched passwords', (done) => {
      test.graphService()
        .set('Authorization', 'Bearer ' + userJWT)
        .send({ query: gqlrepo.mutations.activate,
          variables: {
            payload: {
              password: 'not_the_same_as',
              password2: 'this_one_sure_not_same',
            }
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
          r.body.errors[0].message.should.equals('password_mismatch')
        })
    })

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
        })
    })
  })

  describe('Delete', () => {
    it('Delete', (done) => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({ query: gqlrepo.mutations.delete,
          variables: {
            id: testUsers['admin_created_member'].id
          },
        })
        .expect(200, done)
        .expect(r => {
          // Deleting users happans in trigger
          // Write proper follow up test
          // test.plog(r.body)
        })
    })

    it('GET all Users', (done) => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({ query: gqlrepo.queries.usersList })
        .expect(200, done)
        .expect(r => {
          r.body.data.usersList.length.should.equals(6)
        })
    })
  })

})
