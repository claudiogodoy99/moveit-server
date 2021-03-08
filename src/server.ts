import express from 'express'
import user from '@models/User'

const app = express()

app.get('/', async (req, resp) => {
  try {
    await user.create({
      name: 'claudio',
      email: 'godoy@gmail.com'
    })

    return resp.status(200).json({
      message: 'helo world'
    })
  } catch (ex) {
    return resp.status(400).json({
      message: ex.message
    })
  }
})

app.listen(8080)
