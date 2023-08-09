import path from 'path'
const _ = require('lodash')

describe('CRUD - api.translation', () => {

  let gqlrepo = require(path.join(process.cwd(), 'test/api/translations/ts.gqlrepo.js'))
  let users = {}
  let translations = []

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('CREATE', () => {
    describe('anonymous', () => {
      it('try to create', (done) => {
        test.graphService()
          .send({
            query: gqlrepo.mutations.create,
            variables: gqlrepo.variables.en1
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('try to create', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.create,
            variables: gqlrepo.variables.en1
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_super_admin', () => {
      it('Create English translation', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.create,
            variables: gqlrepo.variables.en1
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.createTranslation.translation.key.should.equal('homepage_greeting_common')
            r.body.data.createTranslation.translation.lang.should.equal('en')
            r.body.data.createTranslation.translation.translation.should.equal('should_be_in_en')
            r.body.data.createTranslation.translation.namespace.should.equal('homepage')
          })
      })

      it('Create Deutsch translation', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.create,
            variables: gqlrepo.variables.de1
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.createTranslation.translation.key.should.equal('homepage_greeting_common')
            r.body.data.createTranslation.translation.lang.should.equal('de')
            r.body.data.createTranslation.translation.translation.should.equal('should_be_in_de')
            r.body.data.createTranslation.translation.namespace.should.equal('homepage')
          })
      })
    })
  })

  describe('GET', () => {
    describe('anonymous', () => {
      it('list-all', (done) => {
        test.graphService()
          .send({ query: gqlrepo.queries.list.all })
          .expect(200, done)
          .expect(r => {
            //en.de
            r.body.data.translationsList.length.should.equal(2)
          })
      })
    })

    describe('test_single_member', () => {
      it('list-all', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({ query: gqlrepo.queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.data.translationsList.length.should.equal(2)
            r.body.data.translationsList[0].key.should.equal('homepage_greeting_common')
            r.body.data.translationsList[1].key.should.equal('homepage_greeting_common')
            r.body.data.translationsList[0].lang.should.equal('de')
            r.body.data.translationsList[1].lang.should.equal('en')
            r.body.data.translationsList[0].translation.should.equal('should_be_in_de')
            r.body.data.translationsList[1].translation.should.equal('should_be_in_en')
            r.body.data.translationsList[0].namespace.should.equal('homepage')
            r.body.data.translationsList[1].namespace.should.equal('homepage')
          })
      })

      it('list-german-only', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({ query: gqlrepo.queries.list.deutsch_only  })
          .expect(200, done)
          .expect(r => {
            let tset = _.find(r.body.data.translationsList, ['lang', 'de'])
            tset.lang.should.equal('de')
          })
      })

      it('list-englisn-only', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({ query: gqlrepo.queries.list.english_only  })
          .expect(200, done)
          .expect(r => {
            let tset = _.find(r.body.data.translationsList, ['lang', 'en'])
            tset.lang.should.equal('en')
          })
      })
    })

    describe('test_super_admin', () => {
      it('list-all', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({ query: gqlrepo.queries.list.all_admin })
          .expect(200, done)
          .expect(r => {
            r.body.data.translationsList.length.should.equal(2)

            translations = r.body.data.translationsList
          })
      })
    })
  })

  describe('UPDATE', () => {
    describe('anonymous', () => {
      it('try to update', (done) => {
        test.graphService()
          .send({
            query: gqlrepo.mutations.update,
            variables: {
              translation: _.find(translations, ['lang', 'en'])
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('try to update', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.update,
            variables: {
              translation: _.find(translations, ['lang', 'en'])
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_super_admin', () => {
      it('update', (done) => {
        let tobj = _.find(translations, ['lang', 'en'])
        tobj.translation = 'should_be_in_en_edited'

        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.update,
            variables: {
              id: tobj.id,
              patch: _.omit(tobj, ['id'])
            }
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.updateTranslation.translation.key.should.equal('homepage_greeting_common')
            r.body.data.updateTranslation.translation.lang.should.equal('en')
            r.body.data.updateTranslation.translation.translation.should.equal('should_be_in_en_edited')
            r.body.data.updateTranslation.translation.namespace.should.equal('homepage')
          })
      })
    })
  })

  describe('GET', () => {
    describe('anonymous', () => {
      it('list-all', (done) => {
        test.graphService()
          .send({ query: gqlrepo.queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.data.translationsList.length.should.equal(2)
          })
      })
    })

    describe('test_single_member', () => {
      it('list-all', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({ query: gqlrepo.queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.data.translationsList.length.should.equal(2)
          })
      })
    })

    describe('test_super_admin', () => {
      it('list-all', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({ query: gqlrepo.queries.list.all_admin })
          .expect(200, done)
          .expect(r => {
            r.body.data.translationsList.length.should.equal(2)
          })
      })
    })
  })

  describe('DELETE', () => {
    describe('anonymous', () => {
      it('try to delete', (done) => {
        test.graphService()
          .send({
            query: gqlrepo.mutations.delete,
            variables: {
              id: _.find(translations, ['lang', 'en']).id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('try to delete', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.delete,
            variables: {
              id: _.find(translations, ['lang', 'en']).id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_super_admin', () => {
      it('delete', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.delete,
            variables: {
              id: _.find(translations, ['lang', 'en']).id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.deleteTranslation.translation.id.should.equal(_.find(translations, ['lang', 'en']).id)
          })
      })
    })
  })

  describe('Check for 0 records after delete', () => {
    describe('anonymous', () => {
      it('list-all', (done) => {
        test.graphService()
          .send({ query: gqlrepo.queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.data.translationsList.length.should.equal(1)
          })
      })
    })

    describe('test_single_member', () => {
      it('list-all', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({ query: gqlrepo.queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.data.translationsList.length.should.equal(1)
          })
      })
    })

    describe('test_super_admin', () => {
      it('list-all', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({ query: gqlrepo.queries.list.all_admin })
          .expect(200, done)
          .expect(r => {
            r.body.data.translationsList.length.should.equal(1)
          })
      })
    })
  })
})
