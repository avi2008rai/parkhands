import { NextApiRequest, NextApiResponse } from 'next'

type Middleware = (req: any, res: any, handler: (result: any) => void) => void

export async function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Middleware) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
