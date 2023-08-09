import path from 'path'

import { queries, mutations, variables } from './user.gqlrepo'

describe('Self Register', () => {
  let users = []
  let testUsers = []
  let jwtTokens = []

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('GET all Users', () => {
    it('List', done => {
      test
        .graphService()
        .authorize(users['test_super_admin'])
        .send({ query: queries.usersList })
        .expect(200, done)
        .expect(r => {
          r.body.data.usersList.length.should.be.above(0)
        })
    })
  })

  describe('Check for email availability', () => {
    it('Check for existing email', done => {
      test
        .graphService()
        .send({
          query: queries.email_available,
          variables: {
            requested_email: users['test_single_member'].me.email,
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.emailAvailable.should.equals(false)
        })
    })

    it('Check for NON-existing email', done => {
      test
        .graphService()
        .send({
          query: queries.email_available,
          variables: {
            requested_email: 'there_is_no_way_exists@parkhands.de',
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.emailAvailable.should.equals(true)
        })
    })

    it('Wrong email format', done => {
      test
        .graphService()
        .send({
          query: queries.email_available,
          variables: {
            requested_email: 'this is no email, begone!',
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
          r.body.errors[0].constraint.should.equals('email_check')
        })
    })
  })

  describe('Quick Registration', () => {
    it('Try to Register', done => {
      test
        .graphService()
        .send({
          query: mutations.register,
          variables: variables.register(''),
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
        })
    })

    it('Try to Register with invalid role', done => {
      test
        .graphService()
        .send({
          query: mutations.register,
          variables: {
            payload: {
              email: 'test_role_check@parkhands.de',
              role: 'app_super_admin',
            },
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
          r.body.errors[0].code.should.equal('IR001')
          r.body.errors[0].message.should.equal('invalid_role')
        })
    })

    it('Register with default user', done => {
      test
        .graphService()
        .send({
          query: mutations.register,
          variables: variables.register(),
        })
        .expect(200, done)
        .expect(r => {
          // jwt token should exists
          r.body.data.register.jwtToken.length.should.be.above(0)
        })
    })

    it('Register with driver role', done => {
      test
        .graphService()
        .send({
          query: mutations.register,
          variables: {
            payload: {
              email: 'test_driver_reg@parkhands.de',
              name: 'test driver reg',
              role: 'app_single_member',
            },
          },
        })
        .expect(200, done)
        .expect(r => {
          // jwt token should exists
          r.body.data.register.jwtToken.length.should.be.above(0)
          jwtTokens['test_driver_reg@parkhands.de'] = r.body.data.register.jwtToken
        })
    })

    it('Register with provider role', done => {
      test
        .graphService()
        .send({
          query: mutations.register,
          variables: {
            payload: {
              email: 'test_provider_reg@parkhands.de',
              name: 'test provider reg',
              role: 'app_provider',
            },
          },
        })
        .expect(200, done)
        .expect(r => {
          // jwt string should exists
          r.body.data.register.jwtToken.length.should.be.above(0)
          jwtTokens['test_provider_reg@parkhands.de'] = r.body.data.register.jwtToken
        })
    })

    describe('Check for pg_event table / should have rows', () => {
      let pg_event_rows = []
      before('Login test users', async () => {
        pg_event_rows = await test.db.query(`
          SELECT * FROM private.pg_event WHERE event_key = 'user.insert';
        `)
      })

      it('pg_event should have 3 rows', done => {
        pg_event_rows.length.should.equal(3)
        done()
      })
    })

    it('Try to Login', done => {
      test
        .graphService()
        .send({
          query: mutations.login,
          variables: {
            payload: {
              email: variables.register().payload.email,
              password: variables.register().payload.password,
            },
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
        })
    })

    it('Login as driver role', done => {
      test
        .graphService()
        .set('Authorization', `Bearer ${jwtTokens['test_driver_reg@parkhands.de']}`)
        .send({ query: queries.me })
        .expect(200, done)
        .expect(r => {
          r.body.data.me.email.should.equals('test_driver_reg@parkhands.de')
          r.body.data.me.role.should.equals('app_single_member')
        })
    })

    it('Login as provider role', done => {
      test
        .graphService()
        .set('Authorization', `Bearer ${jwtTokens['test_provider_reg@parkhands.de']}`)
        .send({ query: queries.me })
        .expect(200, done)
        .expect(r => {
          r.body.data.me.email.should.equals('test_provider_reg@parkhands.de')
          r.body.data.me.role.should.equals('app_provider')
        })
    })
  })

  describe('Resend activation email', () => {
    it('Wrong email format', done => {
      test
        .graphService()
        .send({
          query: mutations.resend_activation_email,
          variables: {
            requested_email: 'this is no email, begone!',
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
          r.body.errors[0].constraint.should.equals('email_check')
        })
    })

    it('Email with no user registered', done => {
      test
        .graphService()
        .send({
          query: mutations.resend_activation_email,
          variables: {
            requested_email: 'never_have_i_ever_registered@parkahands.de',
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
          r.body.errors[0].message.should.equals('user_already_activated_or_unavailable')
        })
    })

    it('Resend for real user', done => {
      test
        .graphService()
        .send({
          query: mutations.resend_activation_email,
          variables: {
            requested_email: variables.register().payload.email,
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.resendActivationEmail.success.should.equals(true)
        })
    })

    describe('Check for pg_event table / should have rows', () => {
      let pg_event_rows = []
      before('Login test users', async () => {
        pg_event_rows = await test.db.query(`
          SELECT * FROM private.pg_event WHERE event_key = 'user.resend_activation_email';
        `)
      })

      it('pg_event should have 1 row', done => {
        pg_event_rows.length.should.equal(1)

        done()
      })
    })
  })

  describe('Quick Registration with password', () => {
    let registeredUser

    it('Register', done => {
      test
        .graphService()
        .send({
          query: mutations.register,
          variables: variables.register('bilbo_the_second@bagins.shire', '12345678'),
        })
        .expect(200, done)
        .expect(r => {
          // jwt string should exists
          r.body.data.register.jwtToken.length.should.be.above(0)
        })
    })

    it('Login', done => {
      test
        .graphService()
        .send({
          query: mutations.login,
          variables: {
            payload: {
              email: 'bilbo_the_second@bagins.shire',
              password: '12345678',
            },
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.login.jwtToken.length.should.be.above(0)

          jwtTokens['bilbo_the_second@bagins.shire'] = r.body.data.login.jwtToken
        })
    })

    it('Get me', done => {
      test
        .graphService()
        .authorize({ jwtToken: jwtTokens['bilbo_the_second@bagins.shire'] })
        .send({ query: queries.me })
        .expect(200, done)
        .expect(r => {
          r.body.data.me.name.should.equals('Bilbo Bagins')
          r.body.data.me.email.should.equals('bilbo_the_second@bagins.shire')
          r.body.data.me.role.should.equals('app_single_member')
          r.body.data.me.status.should.equals('pending')

          registeredUser = r.body.data.me
        })
    })

    it('Disable revoking of email confirmation', done => {
      test
        .graphService()
        .authorize({ jwtToken: jwtTokens['bilbo_the_second@bagins.shire'] })
        .send({
          query: mutations.update,
          variables: {
            payload: {
              id: registeredUser.id,
              emailConfirmed: false,
            },
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors.should.exists
          r.body.errors[0].code.should.equal('US007')
          r.body.errors[0].detail.should.equal('no_revoke_email_confirmation')
        })
    })

    it('Confirm email', done => {
      test
        .graphService()
        .authorize({ jwtToken: jwtTokens['bilbo_the_second@bagins.shire'] })
        .send({
          query: mutations.update,
          variables: {
            payload: {
              id: registeredUser.id,
              emailConfirmed: true,
            },
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.updateUser.user.emailConfirmed.should.equals(true)
        })
    })
  })
})
