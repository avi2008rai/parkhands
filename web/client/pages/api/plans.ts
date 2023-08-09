import { NextApiRequest, NextApiResponse } from 'next'

import { stripe } from 'common/utils/stripeServer'
export { config } from 'common/utils/middleware/resolver'
import { get } from 'common/utils/middleware/restrictMethod'

export default get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const prices = await stripe.prices.list({
      active: true,
      currency: 'eur',
      type: 'recurring',
      expand: ['data.product'],
    })
    res.status(200).json(prices)
  } catch (e) {
    console.error(`Plans list error: ${e.message}`)
    res.status(500).json({ statusCode: 500, message: e.message })
  }
})
