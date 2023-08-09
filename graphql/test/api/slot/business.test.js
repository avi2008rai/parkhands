let users = {}
const centerPoint = {
  latitude: 52.3292841,
  longitude: 10.5632004,
}

const documents = {
  CreateBusiness: `
    mutation CreateBusiness($payload: CreateBusinessInput!) {
      createBusiness(input: $payload) {
        business {
          id
          name
          description
          photoUrl
          markerUrl
          slug
          address
          location {
            geojson
            longitude
            latitude
          }
          address
        }
      }
    }`,
  FindBusiness: `
    query FindBusiness($payload: FindBusinessInputRecordInput!) {
      findBusinessList(payload: $payload) {
        id
        name
        description
        photoUrl
        markerUrl
        ownerId
        address
        location {
          geojson
          longitude
          latitude
        }
      }
    }`,
}
const variables = {
  CreateBusiness: (coordinates = [centerPoint.longitude, centerPoint.latitude]) => ({
    payload: {
      business: {
        name: 'EDEKA Görge',
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Logo_Edeka.svg',
        markerUrl:
          'https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png',
        location: {
          type: 'Point',
          coordinates,
        },
      },
    },
  }),
  FindBusiness: {
    correctLocation: {
      payload: {
        longitude: centerPoint.longitude,
        latitude: centerPoint.latitude,
        distance: 1000,
      },
    },
    invalidLocation: {
      payload: {
        longitude: 42.0,
        latitude: 21.0,
        distance: 1000,
      },
    },
  },
}

describe('Find Business Listings', () => {
  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('CREATE Business', () => {
    describe('anonymous', () => {
      it('try to create', done => {
        test
          .graphService()
          .send({
            query: documents.CreateBusiness,
            variables: variables.CreateBusiness(),
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
            r.body.errors[0].message.should.equal('permission denied for table business')
          })
      })
    })

    describe('single_member', () => {
      it('try to create', done => {
        test
          .graphService()
          .authorize(users['test_single_member'])
          .send({
            query: documents.CreateBusiness,
            variables: variables.CreateBusiness(),
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
            r.body.errors[0].message.should.equal('permission denied for table business')
          })
      })
    })

    describe('provider', () => {
      it('try to create', done => {
        test
          .graphService()
          .authorize(users['test_provider'])
          .send({
            query: documents.CreateBusiness,
            variables: variables.CreateBusiness(),
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
            r.body.errors[0].message.should.equal('permission denied for table business')
          })
      })
    })

    describe('provider premium', () => {
      it('try to create', done => {
        test
          .graphService()
          .authorize(users['test_provider_premium'])
          .send({
            query: documents.CreateBusiness,
            variables: variables.CreateBusiness(),
          })
          .expect(200, done)
          .expect(r => {
            const { business } = r.body.data.createBusiness
            business.should.exists
            business.id.should.exists
            business.name.should.exists
            should(business.description).equal(null)
            should(business.address).equal(null)
            business.photoUrl.should.exists
            business.markerUrl.should.exists
            business.location.should.exists
          })
      })
    })

    describe('super admin', () => {
      it('try to create', done => {
        test
          .graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: documents.CreateBusiness,
            variables: variables.CreateBusiness([
              centerPoint.longitude + 0.001,
              centerPoint.latitude + 0.001,
            ]),
          })
          .expect(200, done)
          .expect(r => {
            const { business } = r.body.data.createBusiness
            business.should.exists
            business.id.should.exists
            business.name.should.exists
            should(business.description).equal(null)
            should(business.address).equal(null)
            business.photoUrl.should.exists
            business.markerUrl.should.exists
            business.location.should.exists
          })
      })
    })
  })

  describe('Find Business Listings', () => {
    describe('anonymous', () => {
      it('empty list on bad location', done => {
        test
          .graphService()
          .send({
            query: documents.FindBusiness,
            variables: variables.FindBusiness.invalidLocation,
          })
          .expect(200, done)
          .expect(r => {
            const { findBusinessList } = r.body.data
            findBusinessList.should.exists
            findBusinessList.length.should.equal(0)
          })
      })

      it('good list on proper location', done => {
        test
          .graphService()
          .send({
            query: documents.FindBusiness,
            variables: variables.FindBusiness.correctLocation,
          })
          .expect(200, done)
          .expect(r => {
            const { findBusinessList } = r.body.data
            findBusinessList.length.should.equal(2)
          })
      })

      it('good list on proper location with proper owner filter', done => {
        test
          .graphService()
          .send({
            query: documents.FindBusiness,
            variables: {
              payload: {
                ...variables.FindBusiness.correctLocation.payload,
                ownerId: users['test_provider_premium'].me.id,
              },
            },
          })
          .expect(200, done)
          .expect(r => {
            const { findBusinessList } = r.body.data
            findBusinessList.length.should.equal(1)
          })
      })

      it('empty list on proper location and bad owner filter', done => {
        test
          .graphService()
          .send({
            query: documents.FindBusiness,
            variables: {
              payload: {
                ...variables.FindBusiness.correctLocation.payload,
                ownerId: users['test_provider'].me.id,
              },
            },
          })
          .expect(200, done)
          .expect(r => {
            const { findBusinessList } = r.body.data
            findBusinessList.should.exists
            findBusinessList.length.should.equal(0)
          })
      })
    })
  })
})
