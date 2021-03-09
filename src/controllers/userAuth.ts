import express, { Request } from 'express'
import User from '@models/User'

const router = express.Router()

const emailExistis = async (request: Request) => {
  const { email } = request.body
  return User.findOne({ email })
}

router.post('/register', async (request, response) => {
  try {
    if (await emailExistis(request)) {
      return response.status(400).json({ error: 'This email already existis ' })
    }

    const {
      email,
      name,
      createAt,
      _id
    } = await User.create(request.body)

    return response.status(201).json({
      email,
      name,
      createAt,
      _id
    })
  } catch (err) {
    console.log(err)
    return response.status(400).json({ error: 'Register failed' })
  }
})

const AuthController = (app:any) => app.use('/auth', router)

export default AuthController
