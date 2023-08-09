import path from 'path'
const _ = require('lodash')

import { queries, mutations, variables } from './amenity.gqlrepo'

describe('CRUD - api.amenity', () => {
  let users = {}
  let amenities = []

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('CREATE', () => {
    describe('anonymous', () => {
      it('Try to create', done => {
        test
          .graphService()
          .send({
            query: mutations.create,
            variables: variables.electric(),
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('Try to Create', done => {
        test
          .graphService()
          .authorize(users['test_single_member'])
          .send({
            query: mutations.create,
            variables: variables.electric(),
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_super_admin', () => {
      it('Create mega electric amenity', done => {
        test
          .graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: mutations.create,
            variables: variables.electric(),
          })
          .expect(200, done)
          .expect(r => {
            let resObj = r.body.data.createAmenity.amenity
            resObj.name.should.equal('Mega Electric')
            resObj.slug.should.startWith('mega-electric')
          })
      })
    })
  })

  describe('GET', () => {
    describe('anonymous', () => {
      it('list-all', done => {
        test
          .graphService()
          .send({ query: queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.data.amenitiesList.length.should.equal(20)
          })
      })
    })

    describe('test_single_member', () => {
      it('list-all', done => {
        test
          .graphService()
          .authorize(users['test_single_member'])
          .send({ query: queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.data.amenitiesList.length.should.equal(20)
          })
      })
    })

    describe('test_super_admin', () => {
      it('list-all', done => {
        test
          .graphService()
          .authorize(users['test_super_admin'])
          .send({ query: queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.data.amenitiesList.length.should.equal(20)

            _.each(r.body.data.amenitiesList, type => {
              amenities[_.snakeCase(type.name)] = type
            })
          })
      })
    })
  })

  describe('UPDATE', () => {
    describe('anonymous', () => {
      it('try to update', done => {
        test
          .graphService()
          .send({
            query: mutations.update,
            variables: {
              id: amenities['mega_electric'].id,
              patch: variables.electric('New Name').amenity,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('try to update', done => {
        test
          .graphService()
          .authorize(users['test_single_member'])
          .send({
            query: mutations.update,
            variables: {
              id: amenities['mega_electric'].id,
              patch: variables.electric('New Name').amenity,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_super_admin', () => {
      it('update', done => {
        test
          .graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: mutations.update,
            variables: {
              id: amenities['mega_electric'].id,
              patch: variables.electric('New Name').amenity,
            },
          })
          .expect(200, done)
          .expect(r => {
            let resObj = r.body.data.updateAmenity.amenity
            resObj.name.should.equal('New Name')
          })
      })
    })
  })

  describe('DELETE', () => {
    describe('anonymous', () => {
      it('Try to delete', done => {
        test
          .graphService()
          .send({
            query: mutations.delete,
            variables: {
              id: amenities['mega_electric'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('Try to delete', done => {
        test
          .graphService()
          .authorize(users['test_single_member'])
          .send({
            query: mutations.delete,
            variables: {
              id: amenities['mega_electric'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_super_admin', () => {
      it('Delete', done => {
        test
          .graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: mutations.delete,
            variables: {
              id: amenities['mega_electric'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.deleteAmenity.amenity.id.should.equal(amenities['mega_electric'].id)
          })
      })

      it('List should containt one less record', done => {
        test
          .graphService()
          .send({ query: queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.data.amenitiesList.length.should.equal(19)
          })
      })
    })
  })
})
