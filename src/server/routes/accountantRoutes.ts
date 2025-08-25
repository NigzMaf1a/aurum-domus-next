import express from 'express';
import {
  createAccountant,
  getAllAccountants,
  getAccountantByID,
  updateAccountant,
  deleteAccountant
} from '../controllers/accountantController';

const router = express.Router();

// Create a new accountant
router.post('/add', createAccountant);

// Get all accountants
router.get('/get', getAllAccountants);

// Get single accountant by ID
router.get('/:id', getAccountantByID);

// Update an accountant by ID
router.put('/:id', updateAccountant);

// Delete an accountant by ID
router.delete('/:id', deleteAccountant);

export default router;
