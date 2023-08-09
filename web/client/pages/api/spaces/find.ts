import _ from 'lodash'
import { performance } from 'perf_hooks'
import { NextApiResponse, NextApiRequest } from 'next'

import { Dataset } from 'gql/utils'
import { fetchStaticDataset } from 'common/utils/fetchStaticDataset'

// Next.js middleware config
export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
}

export type FindStaticSpacesResponse = {
  performance: { [key: string]: any }
  total: number
} & Dataset.StaticSpaces
export type FindStaticSpacesVariables = {
  spaceIds: string[]
}

const staticDatasetPath = 'data/processed/dataset.spaces.json'

const staticData = fetchStaticDataset<Dataset.StaticSpaces>(staticDatasetPath)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
    return
  }

  const variables: FindStaticSpacesVariables = req.body

  try {
    const start = performance.now()

    const spaces = _.chain(staticData.spaces).keyBy('id').at(variables.spaceIds).value()

    const findSpaces = performance.now()

    // Send response back to client
    const response: FindStaticSpacesResponse = {
      performance: {
        _1_findSpaces: findSpaces - start,
      },
      total: spaces.length,
      spaces,
    }
    res.status(200).json(response)
  } catch (e) {
    console.error(e)
    console.error(`Find spaces error: ${e.message}`)
    res.status(400).json({ success: false, statusCode: 400, message: e.message })
  }
}

export default handler
