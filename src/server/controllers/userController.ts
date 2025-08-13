// controllers/userController.ts
import { Request, Response, RequestHandler } from 'express';
import User from '../models/User';
import { UserPayload } from '../interfaces/user';

const userService = new User();

// CREATE - Add a new user
export const createUser:RequestHandler = async (req: Request, res: Response) => {
  const user:UserPayload = req.body;

  try {
    const result = await userService.createUser(user);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to create user', details: message });
  }
};

// READ - Get all users
export const readUsers = async (req: Request, res: Response) => {
  try {
    const rows = await userService.readUsers();
    res.status(200).json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch users', details: message });
  }
};

// UPDATE - Update user by regID
export const updateUser: RequestHandler<{ regID: string }> = async (req, res) => {
  const regID = Number(req.params.regID)
  if (isNaN(regID)) {
    res.status(400).json({ error: 'Invalid regID' })
    return
  }

  const user: UserPayload = req.body

  try {
    const result = await userService.updateUser(regID, user)
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User not found or no changes made' })
      return
    }
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to update user', details: message })
  }
}

// DELETE - Remove user by regID
export const deleteUser: RequestHandler<{ regID: string }> = async (req, res) => {
  const regID = Number(req.params.regID)
  if (isNaN(regID)) {
    res.status(400).json({ error: 'Invalid regID' })
    return
  }

  try {
    const result = await userService.deleteUser(regID)
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to delete user', details: message })
  }
}

// READ - Get user by email (optional)
export const getUserByEmail: RequestHandler<{ email: string }> = async (req, res) => {
  const { email } = req.params

  try {
    const userData = await userService.getUserData(email)
    if (!userData) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    res.status(200).json(userData)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to fetch user', details: message })
  }
}
