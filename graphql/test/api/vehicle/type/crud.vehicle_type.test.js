describe('CRUD - Vehicle Types', () => {
  let users = {},
      vehicle_types = {},
      queries = {},
      mutations = {}

  queries['list-all'] = `query {
                          vehicleTypesList(orderBy: NAME_ASC) {
                            id
                            name
                          }
                        }`

  mutations['create'] = `mutation createVehicleType($vehicleType: VehicleTypeInput!) {
                          createVehicleType(input: { vehicleType: $vehicleType }) {
                            vehicleType {
                              id
                              name
                            }
                          }
                        }`

  mutations['update'] = `mutation updateVehicleType($id: UUID!, $patch: VehicleTypePatch!) {
                          updateVehicleType(input: { id: $id, patch: $patch }) {
                            vehicleType {
                              id
                              name
                            }
                          }
                        }`

  mutations['delete'] = `mutation deleteVehicleType($id: UUID!) {
                          deleteVehicleType(input: { id: $id }) {
                            vehicleType { id }
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
              vehicleType: {
                name: 'anonymous'
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
              vehicleType: {
                name: 'test_single_member'
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
              vehicleType: {
                name: 'test_super_admin'
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.createVehicleType.vehicleType.name.should.equal('test_super_admin')
            vehicle_types['test_super_admin'] = r.body.data.createVehicleType.vehicleType
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
            r.body.data.vehicleTypesList.length.should.equal(5)
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
            r.body.data.vehicleTypesList.length.should.equal(5)
            r.body.data.vehicleTypesList[0].name.should.equal('Diesel')
            r.body.data.vehicleTypesList[1].name.should.equal('Electric')
            r.body.data.vehicleTypesList[2].name.should.equal('Hybrid')
            r.body.data.vehicleTypesList[3].name.should.equal('Petrol')
            r.body.data.vehicleTypesList[4].name.should.equal('test_super_admin')
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
            r.body.data.vehicleTypesList.length.should.equal(5)
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
              id: vehicle_types['test_super_admin'].id,
              patch: {
                name: 'Test renamed'
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
              id: vehicle_types['test_super_admin'].id,
              patch: {
                name: 'Test renamed'
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
              id: vehicle_types['test_super_admin'].id,
              patch: {
                name: 'test_super_admin renamed'
              }
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.updateVehicleType.vehicleType.name.should.equal('test_super_admin renamed')
            vehicle_types['test_super_admin'] = r.body.data.updateVehicleType.vehicleType
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
            r.body.data.vehicleTypesList.length.should.equal(5)
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
            r.body.data.vehicleTypesList.length.should.equal(5)
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
            r.body.data.vehicleTypesList.length.should.equal(5)
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
              id: vehicle_types['test_super_admin'].id,
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
              id: vehicle_types['test_super_admin'].id,
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
              id: vehicle_types['test_super_admin'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.deleteVehicleType.vehicleType.id.should.equal(vehicle_types['test_super_admin'].id)
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
            r.body.data.vehicleTypesList.length.should.equal(4)
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
            r.body.data.vehicleTypesList.length.should.equal(4)
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
            r.body.data.vehicleTypesList.length.should.equal(4)
          })
      })
    })
  })
})
