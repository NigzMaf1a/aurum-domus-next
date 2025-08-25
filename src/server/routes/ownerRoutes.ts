import express from 'express';
import {
  createOwner,
  getAllOwners,
  getOwnerByID,
  updateOwner,
  deleteOwner
} from '../controllers/ownerController';

const router = express.Router();

// Create a new owner
router.post('/add', createOwner);

// Get all owners
router.get('/get', getAllOwners);

// Get single owner by ID
router.get('/:id', getOwnerByID);

// Update an owner by ID
router.put('/:id', updateOwner);

// Delete an owner by ID
router.delete('/:id', deleteOwner);

export default router;
