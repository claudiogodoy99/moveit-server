import mongoose from '@data/connection'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  }
})

export default mongoose.model('user', userSchema)
