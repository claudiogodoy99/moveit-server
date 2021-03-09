import User, { UserModel } from '@models/User'
import express from 'express'
import authMiddleware from '@middlewares/auth'

const router = express.Router()

router.use(authMiddleware)

const completeChallenge = (user :UserModel, amount:number):UserModel => {
  const experienceToNextLevel = Math.pow((user.profile.level + 1) * 4, 2)

  let finalExperience = user.profile.experience + amount

  if (finalExperience > experienceToNextLevel) {
    finalExperience = finalExperience - experienceToNextLevel
    user.profile.level += 1
  }

  user.profile.experience = finalExperience
  user.profile.completedChallenges += 1

  return user
}

router.put('/completechallenge', async (request, response) => {
  const _id = request.query.userId

  const {
    challengeAmount
  } = request.body

  let user = await User.findById({ _id })

  if (!user) { return response.status(400).json({ error: 'User not found' }) }

  user = completeChallenge(user, Number(challengeAmount))

  await User.replaceOne({ _id }, user)

  return response.json(user.profile)
})

router.get('', (request, response) => {

})

const UserController = (app: any) => app.use('/user', router)

export default UserController
