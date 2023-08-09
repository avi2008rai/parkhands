import path from 'path'
import Cors from 'cors'
import getConfig from 'next/config'
import serveStatic from 'serve-static'
import { NextApiRequest, NextApiResponse } from 'next'

import { runMiddleware } from 'utils/runMiddleware'

const {
  serverRuntimeConfig: { BUILD_ID, NODE_ENV },
} = getConfig()

const corsMiddleware = Cors({
  // Only allow requests with GET, POST and OPTIONS
  methods: ['GET', 'POST', 'OPTIONS'],
})

const pagesMiddleware = serveStatic(
  path.join(
    process.cwd(),
    '.next/static',
    NODE_ENV === 'development' ? 'development' : BUILD_ID,
    'loaders',
  ),
)

console.log('api/[widgetName]', { BUILD_ID, NODE_ENV })

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, corsMiddleware)

  const {
    query: { widgetName },
  } = req
  req.url = widgetName as string

  await runMiddleware(req, res, pagesMiddleware)

  // If this point is reached then the pagesMiddleware did not found
  // a file to server => return 404
  res.statusCode = 404
  res.end()
}
