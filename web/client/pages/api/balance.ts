import { NextApiResponse, NextApiRequest } from 'next'

import { stripe } from 'common/utils/stripeServer'
export { config } from 'common/utils/middleware/resolver'
import { get } from 'common/utils/middleware/restrictMethod'
import { graphqlAuth, AuthContext } from 'common/utils/middleware/graphqlAuth'

const handler = async (req: NextApiRequest, res: NextApiResponse, { customerId }: AuthContext) => {
  try {
    if (!customerId) {
      return res.status(404).json({ statusCode: 404, message: 'Customer not found' })
    }
    const customer = await stripe.customers.retrieve(customerId)
    const balanceTransactions = await stripe.customers.listBalanceTransactions(customerId)
    if (customer.deleted) {
      return res.status(400).json({ statusCode: 400, message: 'Customer is deleted' })
    }
    res.status(200).json({
      balance: customer.balance,
      transactions: balanceTransactions.data,
    })
  } catch (e) {
    console.error(`Subscriptions list error: ${e.message}`)
    res.status(500).json({ statusCode: 500, message: e.message })
  }
}

export default get(graphqlAuth(handler))
