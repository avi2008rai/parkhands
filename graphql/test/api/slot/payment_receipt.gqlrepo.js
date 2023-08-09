module.exports = {
  queries: {
    list: {
      all: `
        query {
          paymentReceiptsList {
            id
            paymentIntentId
            receiptUrl
            amount
            createdAt
            updatedAt
        }
      }`,
    }
  },
  mutations: {
    create: `
      mutation createPaymentReceipt($paymentReceipt: PaymentReceiptInput!) {
        createPaymentReceipt(input: { paymentReceipt: $paymentReceipt }) {
          paymentReceipt {
            id
            paymentIntentId
            receiptUrl
            amount
            createdAt
            updatedAt
          }
        }
      }`,
    update: `
      mutation updatePaymentReceipt($id: UUID!, $patch: PaymentReceiptPatch!) {
        updatePaymentReceipt(input: { id: $id, patch: $patch }) {
          paymentReceipt {
            id
            paymentIntentId
            receiptUrl
            amount
            createdAt
            updatedAt
          }
        }
      }`,
    delete: `
      mutation deletePaymentReceipt($id: UUID!) {
        deletePaymentReceipt(input: { id: $id }) {
          paymentReceipt { id }
        }
      }`
  },

  variables: {
    receipt: function(user) {
      return {
        paymentReceipt: {
          ownerId: user.me.id
          , paymentIntentId: 'intent_id'
          , receiptUrl: 'intent_url'
          , amount: 14
        }
      }
    },
  }
}

