import mongoose from '@data/connection'
import bcrypt from 'bcryptjs'
import { Document } from 'mongoose'

interface IUserModel{
  name: String,
  email:String,
  password: String,
  createAt: Date,
  profile:{
    level: number,
    experience: number,
    completedChallenges: number,
    rankingPosition: number
  }
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
  profile: {
    level: {
      type: Number,
      default: 1,
      require: false
    },
    experience: {
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
  }

})

userSchema.pre<UserModel>('save', async function (next) {
  const hash = await bcrypt.hash(String(this.password), 10)
  this.password = hash

  next()
})

export default mongoose.model<UserModel>('user', userSchema)
