import express from 'express';
import {
  createUser,
  readUsers,
  updateUser,
  deleteUser,
  getUserByEmail
} from '../controllers/userController.js';

const router = express.Router();

// Create user
router.post('/', createUser);

// Read all users
router.get('/', readUsers);

// Update user by regID
router.put('/:regID', updateUser);

// Delete user by regID
router.delete('/:regID', deleteUser);

// Optional: Get user by email
router.get('/email/:email', getUserByEmail);

export default router;
