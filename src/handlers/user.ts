import prisma from '../db'
import { createJWT, hashPassword, comparePasswords } from '../modules/auth'

export const createNewUser = async (req, res, next) => {
  try {
    const hash = await hashPassword(req.body.password)

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash,
      },
    })

    const token = createJWT(user)
    res.json({ token })
  } catch (error) {
    console.log(error)
    error.type = 'input'
    next(error)
  }
}

export const signIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const valid = await comparePasswords(req.body.password, user.password)

  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = createJWT(user)
  res.json({ token })
}
