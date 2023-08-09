import gql from 'graphql-tag'

export default gql`
  mutation CreatePaymentReceipt($input: CreatePaymentReceiptInput!) {
    createPaymentReceipt(input: $input) {
      paymentReceipt {
        id
        ownerId
        receiptUrl
        paymentIntentId
        amount
      }
    }
  }
`
