import express from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth/auth'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'))

const port = process.env.PORT || 9999
const path = require('path')

app.get('/', (req, res) => {
  res.status(200)
  // res.json({ message: 'Hello' })
  res.sendFile(path.resolve('src/pages/index.html'))
})

app.use('/api', protect, router)

export default app
