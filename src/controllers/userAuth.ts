import express from 'express'
import User from '@models/User'

const router = express.Router()

router.post('/register', async (request, response) => {
  const { email } = request.body

  try {
    if (await User.findOne({ email })) {
      return response.status(400).json({
        error: 'User Already exists'
      })
    }

    const user = await User.create(request.body)
    return response.status(201).json(user)
  } catch (err) {
    return response.status(400).json({ error: 'Register failed' })
  }
})

const AuthController = (app:any) => app.use('/auth', router)

export default AuthController
