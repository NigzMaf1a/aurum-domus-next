// controllers/authController.ts
import { RequestHandler } from 'express'
import pool from '../utils/db'
import generateToken from '../utils/generateToken'
import bcrypt from 'bcryptjs'


// User model shape (partial, based on login response)
export interface User {
  RegID: number;         
  Name1: string;             
  Name2: string;             
  PhoneNo: string;
  Email: string;
  Password: string;
  Gender: "Male" | "Female";
  RegType: "Customer" | "Manager" | "Accountant" | "Waiter" | "Chef" | "Owner" | "Admin" ;
  dLocation?: string;     
  accStatus: 'Pending' | 'Approved' |'Inactive';
  image?: string; 
  lastAccessed: string;    
}

export const login: RequestHandler = async (req, res) => {
  // Ensure incoming email and password are strings and trimmed
  const { email, password } = req.body;
  const trimmedEmail = String(email).trim();
  const trimmedPassword = String(password).trim();

  if (!trimmedEmail || !trimmedPassword) {
    res.status(400).json({ error: 'Email and password required' });
    return;
  }

  try {
    const [rows] = await pool.query('SELECT * FROM registration WHERE Email = ?', [trimmedEmail]);
    const users = rows as User[];

    const user = users[0];
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const isMatch = await bcrypt.compare(trimmedPassword, String(user.Password));
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const token = generateToken(user);
    console.log(`Token: ${token}`);

    res.json({
      token,
      user: {
        RegID: user.RegID,
        Email: user.Email,
        RegType: user.RegType
      }
    });
  } catch (err) {
    console.error('Login error:', (err as Error).message);
    res.status(500).json({ error: 'Server error during login' });
  }
}
