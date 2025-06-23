// controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/User';

const userService = new User();

// CREATE - Add a new user
export const createUser = async (req: Request, res: Response) => {
  const { name1, name2, phone, email, password, gender, regtype, location, accstatus } = req.body;

  try {
    const result = await userService.createUser(
      name1, name2, phone, email, password, gender, regtype, location, accstatus
    );
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
export const updateUser = async (
  req: Request & { params: { regID: string } },
  res: Response
) => {
  const { regID } = req.params;
  const { name1, name2, phone, email, password, gender, regtype, location, accstatus } = req.body;

  try {
    const result = await userService.updateUser(
      regID, name1, name2, phone, email, password, gender, regtype, location, accstatus
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found or no changes made' });
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to update user', details: message });
  }
};

// DELETE - Remove user by regID
export const deleteUser = async (
  req: Request & { params: { regID: string } },
  res: Response
) => {
  const { regID } = req.params;

  try {
    const result = await userService.deleteUser(regID);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to delete user', details: message });
  }
};

// READ - Get user by email (optional)
export const getUserByEmail = async (
  req: Request & { params: { email: string } },
  res: Response
) => {
  const { email } = req.params;

  try {
    const userData = await userService.getUserData(email);
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(userData);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch user', details: message });
  }
};
