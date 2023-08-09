describe('REST - Amenities', () => {
  let users = []
  let amenities = []

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    // Also include api keys
    users = await test.loginTestUsers(true)
  })


  describe('LIST', () => {
    it('try to list all as anonymous', (done) => {
      test.restService('get', `/rest/amenities`)
        .expect(401, done)
        .expect(r => {
          r.body.error.should.equal('Authentication required')
        })
    })

    it('list all as single_member', (done) => {
      test.restService('get', `/rest/amenities`)
        .set('X-API-KEY', users['test_single_member'].api_key)
        .expect(200, done)
        .expect(r => {
          r.body.length.should.be.above(0);
          amenities['test_single_member'] = r.body[0]
        })
    })
  })

  describe('GET', () => {
    it('try to get amenity as anonymous', (done) => {
      test.restService('get', `/rest/amenities/${amenities['test_single_member'].id}`)
        .expect(401, done)
        .expect(r => {
          r.body.error.should.equal('Authentication required')
        })
    })

    it('get amenity as single_member', (done) => {
      test.restService('get', `/rest/amenities/${amenities['test_single_member'].id}`)
        .set('X-API-KEY', users['test_single_member'].api_key)
        .expect(200, done)
        .expect(r => {
          r.body.id.should.exist
        })
    })
  })
})
