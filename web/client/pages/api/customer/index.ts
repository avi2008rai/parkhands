import { NextApiResponse, NextApiRequest } from 'next'

export { config } from 'common/utils/middleware/resolver'
import { get } from 'common/utils/middleware/restrictMethod'
import { graphqlAuth } from 'common/utils/middleware/graphqlAuth'
import {
  withStripeCustomer,
  StripeCustomerContext,
} from 'common/utils/middleware/withStripeCustomer'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  { customer }: StripeCustomerContext,
) => {
  try {
    return res.status(200).json(customer)
  } catch (e) {
    console.error(`Customer retrieve error: ${e.message}`)
    return res.status(500).json({ statusCode: 500, message: e.message })
  }
}
export default get(graphqlAuth(withStripeCustomer(handler)))
