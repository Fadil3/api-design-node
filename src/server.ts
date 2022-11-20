import express from 'express'
const app = express()
const port = process.env.PORT || 9999
const path = require('path')

app.use(express.static('static'))

app.get('/', (req, res) => {
  res.status(200)
  // res.json({ message: 'Hello' })
  res.sendFile(path.resolve('src/pages/index.html'))
})

export default app
