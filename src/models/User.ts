import mongoose from '@data/connection'
import bcrypt from 'bcryptjs'
import { Document } from 'mongoose'

interface IUserModel{
  name: String,
  email:String,
  password: String,
  createAt: Date,
  level?: Number,
  xp?: Number,
  completedChallenges?: Number,
  rankingPosition?: Number
}

export interface UserModel extends IUserModel, Document {
}

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

userSchema.pre<UserModel>('save', async function (next) {
  let { password } = this

  const hash = await bcrypt.hash(String(password), 10)
  password = hash

  next()
})

export default mongoose.model<UserModel>('user', userSchema)
