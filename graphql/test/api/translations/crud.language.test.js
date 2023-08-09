describe('CRUD - Languages', () => {
  let users = {},
      languages = {},
      queries = {},
      mutations = {}

  queries['list-all'] = `query {
                          languagesList(orderBy: NAME_ASC) {
                            code
                            name
                            weight
                          }
                        }`

queries['list-all-sorted-by-weight'] = `query {
                        languagesList(orderBy: WEIGHT_ASC) {
                          code
                          name
                          weight
                        }
                      }`

  mutations['create'] = `mutation createLanguage($language: LanguageInput!) {
                          createLanguage(input: { language: $language }) {
                            language {
                              code
                              name
                              weight
                            }
                          }
                        }`

  mutations['update'] = `mutation updateLanguage($code: String!, $patch: LanguagePatch!) {
                          updateLanguage(input: { code: $code, patch: $patch }) {
                            language {
                              code
                              name
                              weight
                            }
                          }
                        }`

  mutations['delete'] = `mutation deleteLanguage($code: String!) {
                          deleteLanguage(input: { code: $code }) {
                            language { code }
                          }
                        }`

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
            query: mutations['create'],
            variables: {
              language: {
                code: '00',
                name: 'anonymous',
              }
            },
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
            query: mutations['create'],
            variables: {
              language: {
                code: '00',
                name: 'test_single_member',
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_super_admin', () => {
      it('create', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: mutations['create'],
            variables: {
              language: {
                code: '01',
                name: 'test_super_admin',
                weight: 3,
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.createLanguage.language.code.should.equal('01')
            r.body.data.createLanguage.language.name.should.equal('test_super_admin')
            languages['test_super_admin'] = r.body.data.createLanguage.language
          })
      })
    })
  })

  describe('GET', () => {
    describe('anonymous', () => {
      it('list-all', (done) => {
        test.graphService()
          .send({ query: queries['list-all'] })
          .expect(200, done)
          .expect(r => {
            r.body.data.languagesList.length.should.equal(3)
          })
      })
    })

    describe('test_single_member', () => {
      it('list-all', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({ query: queries['list-all'] })
          .expect(200, done)
          .expect(r => {
            r.body.data.languagesList.length.should.equal(3)
            r.body.data.languagesList[0].code.should.equal('de')
            r.body.data.languagesList[0].name.should.equal('Deutsch')
            r.body.data.languagesList[0].weight.should.equal(1)
            r.body.data.languagesList[1].code.should.equal('en')
            r.body.data.languagesList[1].name.should.equal('English')
            r.body.data.languagesList[1].weight.should.equal(2)
            r.body.data.languagesList[2].code.should.equal('01')
            r.body.data.languagesList[2].name.should.equal('test_super_admin')
            r.body.data.languagesList[2].weight.should.equal(3)
          })
      })

      it('list-all-sorted-by-weight', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({ query: queries['list-all-sorted-by-weight'] })
          .expect(200, done)
          .expect(r => {
            r.body.data.languagesList.length.should.equal(3)
            r.body.data.languagesList[0].code.should.equal('de')
            r.body.data.languagesList[0].name.should.equal('Deutsch')
            r.body.data.languagesList[0].weight.should.equal(1)
            r.body.data.languagesList[1].code.should.equal('en')
            r.body.data.languagesList[1].name.should.equal('English')
            r.body.data.languagesList[1].weight.should.equal(2)
            r.body.data.languagesList[2].code.should.equal('01')
            r.body.data.languagesList[2].name.should.equal('test_super_admin')
            r.body.data.languagesList[2].weight.should.equal(3)
          })
      })
    })

    describe('test_super_admin', () => {
      it('list-all', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({ query: queries['list-all'] })
          .expect(200, done)
          .expect(r => {
            r.body.data.languagesList.length.should.equal(3)
          })
      })
    })
  })

  describe('UPDATE', () => {
    describe('anonymous', () => {
      it('try to update', (done) => {
        test.graphService()
          .send({
            query: mutations['update'],
            variables: {
              code: languages['test_super_admin'].code,
              patch: {
                code: '00',
                name: 'Test renamed',
              }
            },
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
            query: mutations['update'],
            variables: {
              code: languages['test_super_admin'].code,
              patch: {
                code: '00',
                name: 'Test renamed',
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_super_admin', () => {
      it('update', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: mutations['update'],
            variables: {
              code: languages['test_super_admin'].code,
              patch: {
                code: '01',
                name: 'test_super_admin renamed',
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.updateLanguage.language.code.should.equal('01')
            r.body.data.updateLanguage.language.name.should.equal('test_super_admin renamed')
            languages['test_super_admin'] = r.body.data.updateLanguage.language
          })
      })
    })
  })

  describe('GET', () => {
    describe('anonymous', () => {
      it('list-all', (done) => {
        test.graphService()
          .send({ query: queries['list-all'] })
          .expect(200, done)
          .expect(r => {
            r.body.data.languagesList.length.should.equal(3)
          })
      })
    })

    describe('test_single_member', () => {
      it('list-all', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({ query: queries['list-all'] })
          .expect(200, done)
          .expect(r => {
            r.body.data.languagesList.length.should.equal(3)
          })
      })
    })

    describe('test_super_admin', () => {
      it('list-all', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({ query: queries['list-all'] })
          .expect(200, done)
          .expect(r => {
            r.body.data.languagesList.length.should.equal(3)
          })
      })
    })
  })

  describe('DELETE', () => {
    describe('anonymous', () => {
      it('try to delete', (done) => {
        test.graphService()
          .send({
            query: mutations['delete'],
            variables: {
              code: languages['test_super_admin'].code,
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
            query: mutations['delete'],
            variables: {
              code: languages['test_super_admin'].code,
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
            query: mutations['delete'],
            variables: {
              code: languages['test_super_admin'].code,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.deleteLanguage.language.code.should.equal(languages['test_super_admin'].code)
          })
      })
    })
  })

  describe('GET', () => {
    describe('anonymous', () => {
      it('list-all', (done) => {
        test.graphService()
          .send({ query: queries['list-all'] })
          .expect(200, done)
          .expect(r => {
            r.body.data.languagesList.length.should.equal(2)
          })
      })
    })

    describe('test_single_member', () => {
      it('list-all', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({ query: queries['list-all'] })
          .expect(200, done)
          .expect(r => {
            r.body.data.languagesList.length.should.equal(2)
          })
      })
    })

    describe('test_super_admin', () => {
      it('list-all', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({ query: queries['list-all'] })
          .expect(200, done)
          .expect(r => {
            r.body.data.languagesList.length.should.equal(2)
          })
      })
    })
  })
})
