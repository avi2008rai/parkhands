import {
  payment_receipt as prGqlrepo,
} from '/shared/gqlrepo.js'

describe('CRUD - api.payment_receipt', () => {

  let users = {}
  let receipts = []

  before('Reset DB', async () => {
    await test.dbService.reset()
  })

  before('Login test users', async () => {
    users = await test.loginTestUsers()
  })

  describe('CREATE', () => {
    describe('anonymous', () => {
      it('Try to create', (done) => {
        test.graphService()
          .send({
            query: prGqlrepo.mutations.create,
            variables: prGqlrepo.variables.receipt(users['test_single_member'])
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('Create', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: prGqlrepo.mutations.create,
            variables: prGqlrepo.variables.receipt(users['test_single_member'])
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.createPaymentReceipt.paymentReceipt.amount.should.equal('14')

            receipts['test_single_member'] = r.body.data.createPaymentReceipt.paymentReceipt
          })
      })
    })

    describe('test_super_admin', () => {
      it('Create', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: prGqlrepo.mutations.create,
            variables: prGqlrepo.variables.receipt(users['test_super_admin'])
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.createPaymentReceipt.paymentReceipt.amount.should.equal('14')

            receipts['test_super_admin'] = r.body.data.createPaymentReceipt.paymentReceipt
          })
      })
    })
  })

  describe('GET', () => {
    describe('anonymous', () => {
      it('list-all', (done) => {
        test.graphService()
          .send({ query: prGqlrepo.queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
            r.body.errors[0].code.should.equals('42501')
          })
      })
    })

    describe('test_single_member', () => {
      it('list-all', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({ query: prGqlrepo.queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.data.paymentReceiptsList.length.should.equal(1)
          })
      })
    })

    describe('test_super_admin', () => {
      it('list-all', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({ query: prGqlrepo.queries.list.all })
          .expect(200, done)
          .expect(r => {
            r.body.data.paymentReceiptsList.length.should.equal(2)
          })
      })
    })
  })

  describe('DELETE', () => {
    describe('anonymous', () => {
      it('Try to delete', (done) => {
        test.graphService()
          .send({
            query: prGqlrepo.mutations.delete,
            variables: {
              id: receipts['test_single_member'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })
    })

    describe('test_single_member', () => {
      it('Try to delete not own receipt', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: prGqlrepo.mutations.delete,
            variables: {
              id: receipts['test_super_admin'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.errors.should.exists
          })
      })

      it('Delete', (done) => {
        test.graphService()
          .authorize(users['test_single_member'])
          .send({
            query: prGqlrepo.mutations.delete,
            variables: {
              id: receipts['test_single_member'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.deletePaymentReceipt.paymentReceipt.id.should.equal(receipts['test_single_member'].id)
          })
      })
    })

    describe('test_super_admin', () => {
      it('Delete', (done) => {
        test.graphService()
          .authorize(users['test_super_admin'])
          .send({
            query: prGqlrepo.mutations.delete,
            variables: {
              id: receipts['test_super_admin'].id,
            },
          })
          .expect(200, done)
          .expect(r => {
            r.body.data.deletePaymentReceipt.paymentReceipt.id.should.equal(receipts['test_super_admin'].id)
          })
      })
    })
  })
})
