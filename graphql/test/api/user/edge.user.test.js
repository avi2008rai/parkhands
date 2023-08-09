import path from 'path'
const _ = require('lodash')

describe('Users EDGE CASES', () => {

  let gqlrepo = require(path.join(process.cwd(), 'test/api/user/user.gqlrepo.js'))

  let users = [],
    newUsers = []

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('Prepare new accounts', () => {
    it('Create new single_member AS super_admin', done => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({
          query: gqlrepo.mutations.create,
          variables: {
            payload: {
              name: 'new_single_member',
              email: 'new_single_member@parkhands.de',
              role: 'app_single_member',
              status: 'ENABLED',
            },
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.createUser.user.role.should.equal('app_single_member')
          r.body.data.createUser.user.status.should.equal('ENABLED')
          newUsers['new_single_member'] = r.body.data.createUser.user
        })
    })

    it('Create new super_admin AS super_admin', done => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({
          query: gqlrepo.mutations.create,
          variables: {
            payload: {
              name: 'new_super_admin',
              email: 'new_super_admin@parkhands.de',
              role: 'app_super_admin',
              status: 'ENABLED',
            },
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.data.createUser.user.role.should.equal('app_super_admin')
          r.body.data.createUser.user.status.should.equal('ENABLED')
          newUsers['new_super_admin'] = r.body.data.createUser.user
        })
    })
  })

  describe('EDGE CASE 1 - Disable own account', () => {
    it('test_single_member', done => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.update,
          variables: {
            payload: {
              id: users['test_single_member'].me.id,
              status: 'DISABLED',
            },
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors[0].code.should.equal('US005')
          r.body.errors[0].detail.should.equal('Its prohibited to update user status!')
        })
    })

    it('test_super_admin', done => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({
          query: gqlrepo.mutations.update,
          variables: {
            payload: {
              id: users['test_super_admin'].me.id,
              status: 'DISABLED',
            },
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors[0].code.should.equal('US005')
          r.body.errors[0].detail.should.equal('Its prohibited to update user status!')
        })
    })

    it('get all users', done => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({
          query: gqlrepo.queries.usersList,
        })
        .expect(200, done)
        .expect(r => {
          // all test users are still ENABLED
          _.each(r.body.data.usersList, function(obj) {
            obj.status.should.equal('ENABLED')
          })
        })
    })
  })

  describe('EDGE CASE 2 - Disable another account', () => {
    describe('test_single_member', () => {
      it('another single_member', done => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.update,
            variables: {
              payload: {
                id: newUsers['new_single_member'].id,
                status: 'DISABLED',
              },
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors[0].code.should.equal('US004')
            r.body.errors[0].detail.should.equal(
              'Its prohibited to update users if you do not have admin privileges!',
            )
          })
      })

      it('another super_admin', done => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.update,
            variables: {
              payload: {
                id: newUsers['new_super_admin'].id,
                status: 'DISABLED',
              },
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors[0].code.should.equal('US004')
            r.body.errors[0].detail.should.equal(
              'Its prohibited to update users if you do not have admin privileges!',
            )
          })
      })
    })

    describe('test_super_admin', () => {
      it('another single_member', done => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.update,
            variables: {
              payload: {
                id: newUsers['new_single_member'].id,
                status: 'DISABLED',
              },
            },
          })
          .expect(200, done)
          .expect(r => {
            // its possible to disable another single_member
            r.body.data.updateUser.user.status.should.equal('DISABLED')
          })
      })

      it('another super_admin', done => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.update,
            variables: {
              payload: {
                id: newUsers['new_super_admin'].id,
                status: 'DISABLED',
              },
            },
          })
          .expect(200, done)
          .expect(r => {
            // its possible to disable another super_admin
            r.body.data.updateUser.user.status.should.equal('DISABLED')
          })
      })
    })
  })

  describe('EDGE CASE 3 - Restrict role change on own account', () => {
    it('test_single_member', done => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.update,
          variables: {
            payload: {
              id: users['test_single_member'].me.id,
              role: 'app_super_admin',
            },
          },
        })
        .expect(200, done)
        .expect(r => {
          r.body.errors[0].code.should.equal('RO011')
          r.body.errors[0].detail.should.equal('Apply role: `app_super_admin` is prohibited!')
        })
    })
  })

  describe('EDGE CASE 4 - Restrict role change on another account', () => {
    describe('test_single_member', () => {
      it('another single_member', done => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.update,
            variables: {
              payload: {
                id: newUsers['new_single_member'].id,
                role: 'app_super_admin',
              },
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors[0].code.should.equal('US004')
            r.body.errors[0].detail.should.equal(
              'Its prohibited to update users if you do not have admin privileges!',
            )
          })
      })

      it('another super_admin', done => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.update,
            variables: {
              payload: {
                id: newUsers['new_super_admin'].id,
                role: 'app_super_admin',
              },
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors[0].code.should.equal('US004')
            r.body.errors[0].detail.should.equal(
              'Its prohibited to update users if you do not have admin privileges!',
            )
          })
      })
    })
  })

  describe('EDGE CASE 5 - Soft Delete own account', () => {
    it('get all users', done => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({
          query: gqlrepo.queries.usersList,
        })
        .expect(200, done)
        .expect(r => {
          // total test users
          r.body.data.usersList.length.should.equal(6)
        })
    })

    it('test_single_member', done => {
      test.graphService()
        .authorize(users['test_single_member'])
        .send({
          query: gqlrepo.mutations.delete,
          variables: {
            id: users['test_single_member'].me.id,
          },
        })
        .expect(200, done)
        .expect(r => {
          // currently its possible to soft-delete own account if NOT super_admin
          r.body.errors.should.exists
          should(r.body.data.deleteUser).be.exactly(null)
        })
    })

    it('test_super_admin', done => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({
          query: gqlrepo.mutations.delete,
          variables: {
            id: users['test_super_admin'].me.id,
          },
        })
        .expect(200, done)
        .expect(r => {
          // its NOT possible to soft-delete own account if super_admin
          r.body.errors.should.exists
          should(r.body.data.deleteUser).be.exactly(null)
        })
    })

    it('get all users', done => {
      test.graphService()
        .authorize(users['test_super_admin'])
        .send({
          query: gqlrepo.queries.usersList,
        })
        .expect(200, done)
        .expect(r => {
          // confirm that test_single_member is deleted
          r.body.data.usersList.length.should.equal(5)
          _.each(r.body.data.usersList, function(obj) {
            obj.id.should.not.equal(users['test_single_member'].me.id)
          })
        })
    })
  })

  describe('EDGE CASE 6 - Soft Delete another account', () => {
    describe('test_single_member', () => {
      it('another single_member', done => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.delete,
            variables: {
              id: newUsers['new_single_member'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            // its NOT possible to soft-delete another account due to RLS policy
            r.body.errors.should.exists
            should(r.body.data.deleteUser).be.exactly(null)
          })
      })

      it('another super_admin', done => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: gqlrepo.mutations.delete,
            variables: {
              id: newUsers['new_super_admin'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            // its NOT possible to soft-delete another account due to RLS policy
            r.body.errors.should.exists
            should(r.body.data.deleteUser).be.exactly(null)
          })
      })
    })

    describe('test_super_admin', () => {
      it('another single_member', done => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.delete,
            variables: {
              id: newUsers['new_single_member'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            // its possible to soft-delete another non-admin account as super_admin
            r.body.errors.should.exists
            should(r.body.data.deleteUser).be.exactly(null)
          })
      })

      it('another super_admin', done => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.mutations.delete,
            variables: {
              id: newUsers['new_super_admin'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            // its NOT possible to soft-delete another super_admin account
            r.body.errors.should.exists
            should(r.body.data.deleteUser).be.exactly(null)
          })
      })

      it('get all users', done => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: gqlrepo.queries.usersList,
          })
          .expect(200, done)
          .expect(r => {
            // confirm that test_single_member and new_single_member are deleted
            r.body.data.usersList.length.should.equal(4)
            _.each(r.body.data.usersList, function(obj) {
              obj.id.should.not.equal(users['test_single_member'].me.id)
              obj.id.should.not.equal(newUsers['new_single_member'].id)
            })
          })
      })
    })
  })
})
