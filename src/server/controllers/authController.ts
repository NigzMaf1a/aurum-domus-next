// controllers/authController.ts
import { RequestHandler } from 'express'
import pool from '../utils/db'
import generateToken from '../utils/generateToken'
import bcrypt from 'bcryptjs'

// User model shape (partial, based on login response)
interface User {
  id: number
  email: string
  password: string
  role: string
}

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password required' })
    return
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    const users = rows as User[]

    const user = users[0]
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    const token = generateToken(user)

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    console.error('Login error:', (err as Error).message)
    res.status(500).json({ error: 'Server error during login' })
  }
}
