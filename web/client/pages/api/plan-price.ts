import getConfig from 'next/config'
import { NextApiRequest, NextApiResponse } from 'next'

import { PlanPriceResponse } from 'lib/api/responses'
import { stripe } from 'common/utils/stripeServer'
export { config } from 'common/utils/middleware/resolver'

const {
  publicRuntimeConfig: { premiumSubscription },
} = getConfig()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
    return
  }

  try {
    const price = await stripe.prices.retrieve(premiumSubscription.priceId, {
      expand: ['product'],
    })
    const response: PlanPriceResponse = {
      id: price.id,
      active: price.active,
      livemode: price.livemode,
      unitAmount: price.unit_amount ? price.unit_amount / 100 : 0,
    }
    res.status(200).json(response)
  } catch (e) {
    console.error(`Plan retrieve error: ${e.message}`)
    res.status(500).json({ statusCode: 500, message: e.message })
  }
}
