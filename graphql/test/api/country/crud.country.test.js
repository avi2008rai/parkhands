describe('CRUD - Countries', () => {
  let users = {},
      countries = {},
      queries = {},
      mutations = {}

  queries['list-all'] = `query {
                          countriesList(orderBy: NAME_ASC) {
                            id
                            code
                            name
                            status
                          }
                        }`

  queries['list-enabled'] = `query {
                              countriesList(orderBy: NAME_ASC, condition: {status: ENABLED}) {
                                id
                                code
                                name
                                status
                              }
                            }`

  mutations['create'] = `mutation createCountry($country: CountryInput!) {
                          createCountry(input: { country: $country }) {
                            country {
                              id
                              code
                              name
                              status
                            }
                          }
                        }`

  mutations['update'] = `mutation updateCountry($id: UUID!, $patch: CountryPatch!) {
                          updateCountry(input: { id: $id, patch: $patch }) {
                            country {
                              id
                              code
                              name
                              status
                            }
                          }
                        }`

  mutations['delete'] = `mutation deleteCountry($id: UUID!) {
                          deleteCountry(input: { id: $id }) {
                            country { id }
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
              country: {
                code: '00',
                name: 'anonymous',
                status: 'ENABLED'
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
              country: {
                code: '00',
                name: 'test_single_member',
                status: 'ENABLED'
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
              country: {
                code: '01',
                name: 'test_super_admin',
                status: 'ENABLED'
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.createCountry.country.code.should.equal('01')
            r.body.data.createCountry.country.name.should.equal('test_super_admin')
            r.body.data.createCountry.country.status.should.equal('ENABLED')
            countries['test_super_admin'] = r.body.data.createCountry.country
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
            r.body.data.countriesList.length.should.equal(256)
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
            r.body.data.countriesList.length.should.equal(256)
            r.body.data.countriesList[0].code.should.equal('AF')
            r.body.data.countriesList[0].name.should.equal('Afghanistan')
            r.body.data.countriesList[0].status.should.equal('DISABLED')
          })
      })

      it('list-enabled', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({ query: queries['list-enabled'] })
          .expect(200, done)
          .expect(r => {
            r.body.data.countriesList.length.should.equal(2)
            r.body.data.countriesList[0].code.should.equal('DE')
            r.body.data.countriesList[0].name.should.equal('Germany')
            r.body.data.countriesList[0].status.should.equal('ENABLED')

            r.body.data.countriesList[1].code.should.equal('01')
            r.body.data.countriesList[1].name.should.equal('test_super_admin')
            r.body.data.countriesList[1].status.should.equal('ENABLED')
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
            r.body.data.countriesList.length.should.equal(256)
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
              code: countries['test_super_admin'].code,
              patch: {
                code: '00',
                name: 'Test renamed',
                status: 'ENABLED'
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
              code: countries['test_super_admin'].code,
              patch: {
                code: '00',
                name: 'Test renamed',
                status: 'ENABLED'
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
              id: countries['test_super_admin'].id,
              patch: {
                code: '01',
                name: 'test_super_admin renamed',
                status: 'DISABLED'
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.updateCountry.country.code.should.equal('01')
            r.body.data.updateCountry.country.name.should.equal('test_super_admin renamed')
            r.body.data.updateCountry.country.status.should.equal('DISABLED')
            countries['test_super_admin'] = r.body.data.updateCountry.country
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
            r.body.data.countriesList.length.should.equal(256)
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
            r.body.data.countriesList.length.should.equal(256)
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
            r.body.data.countriesList.length.should.equal(256)
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
              id: countries['test_super_admin'].id,
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
              id: countries['test_super_admin'].id,
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
              id: countries['test_super_admin'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.deleteCountry.country.id.should.equal(countries['test_super_admin'].id)
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
            r.body.data.countriesList.length.should.equal(255)
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
            r.body.data.countriesList.length.should.equal(255)
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
            r.body.data.countriesList.length.should.equal(255)
          })
      })
    })
  })
})
