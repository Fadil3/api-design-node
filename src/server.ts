import express from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createNewUser, signIn } from './handlers/user'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'))

const port = process.env.PORT || 9999
const path = require('path')

app.get('/', (req, res) => {
  // throw new Error('ERRROR')
  res.status(200)
  res.json({ message: 'Hello' })
  // res.sendFile(path.resolve('src/pages/index.html'))
})

app.use('/api', protect, router)
app.post('/user', createNewUser)
app.post('/signin', signIn)

app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401)
    res.json({ message: 'Unauthorized' })
  } else if (err.type === 'input') {
    res.status(400)
    res.json({ message: 'Bad Request' })
  } else {
    res.status(500)
    res.json({ message: 'Internal Server Error' })
  }
})

export default app
