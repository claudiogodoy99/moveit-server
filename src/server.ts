import express, { json, urlencoded } from 'express'
import AuthController from '@controllers/userAuth'
import UserController from '@controllers/userController'
import RankingController from '@controllers/rankingController'

const app = express()

app.use(json())

app.use(urlencoded({
  extended: true
}))

AuthController(app)
UserController(app)
RankingController(app)

const PORT = process.env.PORT || 8080

app.listen(PORT)
