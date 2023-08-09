describe('REST CRUD - Slots', () => {
  let users = []
  let slots = []
  let createGeomPoint = (coordinates) => {
    return {
      type: 'Point',
      coordinates: coordinates,
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:EPSG::4326"
        }
      }
    }
  }

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    // Also include api keys
    users = await test.loginTestUsers(true)
  })

  describe('CREATE', () => {
    it('try to create slot as anonymous', (done) => {
      test.restService('post', `/rest/slots`)
        .send({
          name: 'Temp Slot 1',
          vehicleSizeId: '59ae4bb4-2035-4eb2-9adf-abbc3f8aa50f',
          pricePerHour: 5,
          status: 'ENABLED',
          location: createGeomPoint([23.325264751911163, 42.70777315898353])
        })
        .expect(401, done)
        .expect(r => {
          r.body.error.should.equal('Authentication required')
        })
    })

    it('create slot as single_member', (done) => {
      test.restService('post', `/rest/slots`)
        .set('X-API-KEY', users['test_single_member'].api_key)
        .send({
          name: 'Temp Slot 1',
          vehicleSizeId: '59ae4bb4-2035-4eb2-9adf-abbc3f8aa50f',
          pricePerHour: 5,
          status: 'ENABLED',
          location: createGeomPoint([23.325264751911163, 42.70777315898353])
        })
        .expect(201, done)
        .expect(r => {
          r.body.id.should.exist
          slots['test_single_member'] = r.body
        })
    })
  })

  describe('LIST', () => {
    it('try to list all as anonymous', (done) => {
      test.restService('get', `/rest/slots`)
        .expect(401, done)
        .expect(r => {
          r.body.error.should.equal('Authentication required')
        })
    })

    it('list all as single_member', (done) => {
      test.restService('get', `/rest/slots`)
        .set('X-API-KEY', users['test_single_member'].api_key)
        .expect(200, done)
        .expect(r => {
          r.body.length.should.be.above(0);
        })
    })
  })

  describe('GET', () => {
    it('try to get slot as anonymous', (done) => {
      test.restService('get', `/rest/slots/${slots['test_single_member'].id}`)
        .expect(401, done)
        .expect(r => {
          r.body.error.should.equal('Authentication required')
        })
    })

    it('get slot as single_member', (done) => {
      test.restService('get', `/rest/slots/${slots['test_single_member'].id}`)
        .set('X-API-KEY', users['test_single_member'].api_key)
        .expect(200, done)
        .expect(r => {
          r.body.id.should.exist
        })
    })
  })

  describe('UPDATE', () => {
    it('try to update slot as anonymous', (done) => {
      test.restService('put', `/rest/slots/${slots['test_single_member'].id}`)
        .send({
          name: 'test_single_member renamed',
          status: 'DISABLED'
        })
        .expect(401, done)
        .expect(r => {
          r.body.error.should.equal('Authentication required')
        })
    })

    it('update slot as single_member', (done) => {
      test.restService('put', `/rest/slots/${slots['test_single_member'].id}`)
        .set('X-API-KEY', users['test_single_member'].api_key)
        .send({
          name: 'test_single_member renamed',
          status: 'DISABLED'
        })
        .expect(200, done)
        .expect(r => {
          r.body.id.should.exist
        })
    })
  })

  describe('DELETE', () => {
    // Soft delete is problematic to handle
    // Currently returns 500 without knowledge if item is deleted or not
    it('try to delete slot as anonymous', (done) => {
      test.restService('delete', `/rest/slots/${slots['test_single_member'].id}`)
        .expect(401, done)
    })

    it('delete slot as single_member', (done) => {
      test.restService('delete', `/rest/slots/${slots['test_single_member'].id}`)
        .set('X-API-KEY', users['test_single_member'].api_key)
        .expect(500, done)
        .expect(r => {
          // delete successfully
          //r.body.should.be.empty()
        })
    })

    it('delete slot as super_admin', (done) => {
      test.restService('delete', `/rest/slots/${slots['test_single_member'].id}`)
        .set('X-API-KEY', users['test_super_admin'].api_key)
        .expect(500, done)
        .expect(r => {
          // same response, already deleted item
          //r.body.should.be.empty()
        })
    })
  })
})
