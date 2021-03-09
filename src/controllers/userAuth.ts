import express, { Request } from 'express'
import User, { UserModel } from '@models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '@config/auth.json'

const router = express.Router()

const getByEmail = async (request: Request) => {
  const { email } = request.body
  return User.findOne({ email })
}

const generateJwtToken = (user: UserModel) => {
  return jwt.sign({
    _id: user._id
  }, config.secret,
  {
    expiresIn: 86400
  })
}

router.post('/register', async (request, response) => {
  try {
    if (await getByEmail(request)) {
      return response.status(400).json({ error: 'This email already existis ' })
    }

    const user = await User.create(request.body)

    user.password = ''

    return response.status(201).json({ user, token: generateJwtToken(user) })
  } catch (err) {
    return response.status(400).json({ error: 'Register failed' })
  }
})

router.post('/authenticate', async (request, response) => {
  const { email, password } = request.body

  try {
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return response.status(401).json({
        error: 'User not found'
      })
    }

    if (!await bcrypt.compare(password, String(user.password))) {
      return response.status(401).json({
        error: 'Invalid password'
      })
    }

    user.password = ''

    const token = generateJwtToken(user)

    return response.status(200).json({ user, token })
  } catch (err) {
    return response.status(500).send()
  }
})

const AuthController = (app: any) => app.use('/auth', router)

export default AuthController
