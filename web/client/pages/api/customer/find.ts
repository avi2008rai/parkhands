import { NextApiResponse, NextApiRequest } from 'next'

import { graphqlAuth, AuthContext } from 'common/utils/middleware/graphqlAuth'
import { stripe } from 'common/utils/stripeServer'
export { config } from 'common/utils/middleware/resolver'

const handler = async (req: NextApiRequest, res: NextApiResponse, { user }: AuthContext) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
    return
  }

  try {
    const { email } = user
    const customers = await stripe.customers.list({ email })
    if (customers.data.length > 0) {
      const customer = customers.data[0]
      return res.status(200).json(customer)
    }

    return res.status(404).json({ statusCode: 404, message: 'Customer not found' })
  } catch (e) {
    console.error(`Customer retrieve error: ${e.message}`)
    return res.status(500).json({ statusCode: 500, message: e.message })
  }
}
export default graphqlAuth(handler)
