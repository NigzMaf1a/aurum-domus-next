// controllers/authController.ts
import { Request, Response } from 'express'
import pool from '../utils/db'
import generateToken from '../utils/generateToken'
import bcrypt from 'bcryptjs'

// User model shape (partial, based on your login response)
interface User {
  id: number
  email: string
  password: string
  role: string
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' })
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    const users = rows as User[]

    const user = users[0]
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' })
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
