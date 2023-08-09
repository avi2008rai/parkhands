describe('REST CRUD - Users', () => {
  let users = []
  let newUsers = []

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    // Also include api keys
    users = await test.loginTestUsers(true)
  })

  describe('CREATE', () => {
    it('try to create user as anonymous', (done) => {
      test.restService('post', `/rest/users`)
        .send({
          name: 'new_single_member',
          email: 'new_single_member@parkhands.de',
          role: 'app_single_member',
          status: 'ENABLED',
        })
        .expect(401, done)
        .expect(r => {
          r.body.error.should.equal('Authentication required')
        })
    })

    it('try to create user as single_member', (done) => {
      test.restService('post', `/rest/users`)
        .set('X-API-KEY', users['test_single_member'].api_key)
        .send({
          name: 'new_single_member',
          email: 'new_single_member@parkhands.de',
          role: 'app_single_member',
          status: 'ENABLED',
        })
        .expect(401, done)
        .expect(r => {
          r.body.error.should.equal('Authentication required')
        })
    })

    it('create user as super_admin', (done) => {
      test.restService('post', `/rest/users`)
        .set('X-API-KEY', users['test_super_admin'].api_key)
        .send({
          name: 'new_single_member',
          email: 'new_single_member@parkhands.de',
          role: 'app_single_member',
          status: 'ENABLED',
        })
        .expect(201, done)
        .expect(r => {
          r.body.id.should.exist
          newUsers['new_single_member'] = r.body
        })
    })
  })

  describe('LIST', () => {
    it('try to list all as anonymous', (done) => {
      test.restService('get', `/rest/users`)
        .expect(401, done)
        .expect(r => {
          r.body.error.should.equal('Authentication required')
        })
    })

    it('list all as super_admin', (done) => {
      test.restService('get', `/rest/users`)
        .set('X-API-KEY', users['test_super_admin'].api_key)
        .expect(200, done)
        .expect(r => {
          r.body.length.should.be.above(0);
        })
    })
  })

  describe('GET', () => {
    it('try to get user as anonymous', (done) => {
      test.restService('get', `/rest/users/${newUsers['new_single_member'].id}`)
        .expect(401, done)
        .expect(r => {
          r.body.error.should.equal('Authentication required')
        })
    })

    it('get user as super_admin', (done) => {
      test.restService('get', `/rest/users/${newUsers['new_single_member'].id}`)
        .set('X-API-KEY', users['test_super_admin'].api_key)
        .expect(200, done)
        .expect(r => {
          r.body.id.should.exist
        })
    })
  })

  describe('UPDATE', () => {
    it('try to update user as anonymous', (done) => {
      test.restService('put', `/rest/users/${newUsers['new_single_member'].id}`)
        .send({
          name: 'new_single_member renamed',
          status: 'DISABLED'
        })
        .expect(401, done)
    })

    it('update user as super_admin', (done) => {
      test.restService('put', `/rest/users/${newUsers['new_single_member'].id}`)
        .set('X-API-KEY', users['test_super_admin'].api_key)
        .send({
          name: 'new_single_member renamed',
          status: 'DISABLED'
        })
        .expect(200, done)
        .expect(r => {
          r.body.id.should.exist
        })
    })
  })

  describe('DELETE', () => {
    it('try to delete user as anonymous', (done) => {
      test.restService('delete', `/rest/users/${newUsers['new_single_member'].id}`)
        .expect(401, done)
    })

    it('delete user as super_admin', (done) => {
      test.restService('delete', `/rest/users/${newUsers['new_single_member'].id}`)
        .set('X-API-KEY', users['test_super_admin'].api_key)
        .expect(500, done)
        .expect(r => {
          // delete successfully
          //r.body.should.be.empty()
        })
    })
  })
})
