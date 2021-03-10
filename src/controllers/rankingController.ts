import express from 'express'
import User from '@models/User'
import authMiddleware from '@middlewares/auth'
const router = express.Router()

router.use(authMiddleware)

router.get('/', async (request, response) => {
  try {
    const userByRanking = User.find().sort({ level: 1, experience: 1 })

    return response.status(200).json(await userByRanking)
  } catch (err) {
    console.log(err)
    return response.status(500).json({ error: 'Somehing happens' })
  }
})

const RankingController = (app: any) => app.use('/ranking', router)
export default RankingController
