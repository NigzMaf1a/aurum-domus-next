import express from 'express';
import {
  createWaiter,
  getAllWaiters,
  getWaiterByID,
  updateWaiter,
  deleteWaiter
} from '../controllers/waiterController';

const router = express.Router();

// Create a new waiter
router.post('/add', createWaiter);

// Get all waiters
router.get('/get', getAllWaiters);

// Get single waiter by ID
router.get('/:id', getWaiterByID);

// Update a waiter by ID
router.put('/:id', updateWaiter);

// Delete a waiter by ID
router.delete('/:id', deleteWaiter);

export default router;
