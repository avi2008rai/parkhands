describe('REST - vehicleSizes', () => {
  let users = []
  let vehicleSizes = []

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    // Also include api keys
    users = await test.loginTestUsers(true)
  })


  describe('LIST', () => {
    it('try to list all as anonymous', (done) => {
      test.restService('get', `/rest/vehicleSizes`)
        .expect(401, done)
        .expect(r => {
          r.body.error.should.equal('Authentication required')
        })
    })

    it('list all as single_member', (done) => {
      test.restService('get', `/rest/vehicleSizes`)
        .set('X-API-KEY', users['test_single_member'].api_key)
        .expect(200, done)
        .expect(r => {
          r.body.length.should.be.above(0);
          vehicleSizes['test_single_member'] = r.body[0]
        })
    })
  })

  describe('GET', () => {
    it('try to get vehicleSize as anonymous', (done) => {
      test.restService('get', `/rest/vehicleSizes/${vehicleSizes['test_single_member'].id}`)
        .expect(401, done)
        .expect(r => {
          r.body.error.should.equal('Authentication required')
        })
    })

    it('get vehicleSize as single_member', (done) => {
      test.restService('get', `/rest/vehicleSizes/${vehicleSizes['test_single_member'].id}`)
        .set('X-API-KEY', users['test_single_member'].api_key)
        .expect(200, done)
        .expect(r => {
          r.body.id.should.exist
        })
    })
  })
})
