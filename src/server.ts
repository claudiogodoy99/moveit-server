import express from 'express'

const app = express()

app.get('/', (req, resp) => {
  return resp.status(200).json({
    message: 'helo world'
  })
})

app.listen(8080)
