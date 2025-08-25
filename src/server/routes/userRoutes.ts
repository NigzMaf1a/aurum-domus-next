import express from 'express';
import {
  createUser,
  readUsers,
  updateUser,
  deleteUser,
  getUserByEmail
} from '../controllers/userController';

const router = express.Router();

// Create user
router.post('/add', createUser);

// Read all users
router.get('/get', readUsers);

// Optional: Get user by email
router.get('/email/:email', getUserByEmail);

// Update user by regID
router.put('/:regID', updateUser);

// Delete user by regID
router.delete('/:regID', deleteUser);

export default router;
