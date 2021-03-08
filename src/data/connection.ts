import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://cgodoy:123@cluster0.jfqwo.mongodb.net/moveit?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export default mongoose
