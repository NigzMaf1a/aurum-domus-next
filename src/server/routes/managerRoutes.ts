import express from 'express';
import {
  createManager,
  getAllManagers,
  getManagerByID,
  updateManager,
  deleteManager
} from '../controllers/managerController';

const router = express.Router();

// Create a new manager
router.post('/add', createManager);

// Get all managers
router.get('/get', getAllManagers);

// Get single manager by ID
router.get('/:id', getManagerByID);

// Update a manager by ID
router.put('/:id', updateManager);

// Delete a manager by ID
router.delete('/:id', deleteManager);

export default router;
