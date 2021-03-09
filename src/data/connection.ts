import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.Promise = global.Promise
mongoose.connect(String(process.env.MONGODB ?? ''), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

export default mongoose
