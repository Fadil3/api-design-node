import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5)
}

export const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET
  )
  return token
}

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization

  // Check if bearer is undefined in the header
  if (!bearer) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  // split the bearer and get the token
  const [, token] = bearer.split(' ')
  if (!token) {
    return res.status(401).json({ message: 'Not valid token' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
    return
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
