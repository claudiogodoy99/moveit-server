import mongoose from '@data/connection'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  level: {
    type: Number,
    default: 1,
    require: false
  },
  xp: {
    type: Number,
    default: 0,
    require: false
  },
  completedChallenges: {
    type: Number,
    default: 0,
    require: false
  },
  rankingPosition: {
    type: Number,
    require: false
  }
})

userSchema.pre('save', async function (next) {
  const creatingObj:any = this

  const hash = await bcrypt.hash(creatingObj.password, 10)
  creatingObj.password = hash

  next()
})

export default mongoose.model('user', userSchema)
