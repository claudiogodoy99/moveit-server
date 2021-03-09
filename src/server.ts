import express, { json, urlencoded } from 'express'
import AuthController from '@controllers/userAuth'

const app = express()

app.use(json())

app.use(urlencoded({
  extended: true
}))

AuthController(app)

app.listen(8080)
