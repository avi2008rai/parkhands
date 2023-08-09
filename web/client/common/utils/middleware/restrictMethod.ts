import { NextApiRequest, NextApiResponse } from 'next'

declare type Handler = (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>

export const restrictMethod = (handler: Handler, method: string | string[] = 'GET') => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  // Method not defined
  if (!req.method) {
    return handler(req, res)
  }
  // Provided method is string like 'GET'
  if (typeof method === 'string') {
    if (method !== req.method) {
      res.setHeader('Allow', method)
      res.status(405).end('Method Not Allowed')
      return
    }
  } else {
    // Array of methods like ['GET', 'POST']
    if (!method.includes(req.method)) {
      res.setHeader('Allow', method.join(', '))
      res.status(405).end('Method Not Allowed')
    }
  }
  handler(req, res)
}

export const get = (handler: Handler) => restrictMethod(handler, 'GET')
export const post = (handler: Handler) => restrictMethod(handler, 'POST')
