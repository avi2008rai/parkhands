import jwt from 'express-jwt'
import getConfig from 'next/config'
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { runMiddleware } from './runMiddleware'

const { serverRuntimeConfig } = getConfig()
const jwtValidation = jwt({
  secret: serverRuntimeConfig.JWT_SECRET,
  credentialsRequired: true,
  requestProperty: 'decodedJwt',
})

export type JwtUser = {
  role: 'app_single_member' | 'app_super_user'
  id: string
  exp: number
  iat: number
  aud: string
  iss: string
}

export const jwtAuth = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    // Validate JWT validity against jwt secret
    await runMiddleware(req, res, jwtValidation) // attaches user to req
    // @ts-ignore ts(2339)
    if (!req.decodedJwt) {
      throw new Error('Unauthenticated')
    }
    return handler(req, res)
  } catch (err) {
    console.error(err)
    return res.status(401).json({ statusCode: 401, message: err.message })
  }
}
