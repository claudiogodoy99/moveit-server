import { NextFunction, Request, Response } from 'express'

import jwt from 'jsonwebtoken'
import config from '@config/auth.json'

const authMiddleware = (request:Request, res: Response, next:NextFunction) => {
  if (!request.headers?.authorization) { return res.status(401).json({ erro: 'No token provided' }) }

  const authHeader = request.headers.authorization

  const parts = authHeader.split(' ')

  if (!(parts.length === 2)) { return res.status(401).json({ erro: 'Token error' }) }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) { return res.status(401).json({ erro: 'Token bad format' }) }

  jwt.verify(token, config.secret, (error, decoded:any) => {
    if (error) return res.status(401).json({ erro: 'Invalid Token' })
    request.query.userId = decoded._id
  })

  return next()
}

export default authMiddleware
