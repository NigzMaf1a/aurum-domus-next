import express from 'express';
import {
  createCustomer,
  getAllCustomers,
  getCustomerByID,
  updateCustomer,
  deleteCustomer
} from '../controllers/customerController';

const router = express.Router();

// Create a new customer
router.post('/add', createCustomer);

// Get all customers
router.get('/get', getAllCustomers);

// Get a single customer by ID
router.get('/:id', getCustomerByID);

// Update a customer by ID
router.put('/:id', updateCustomer);

// Delete a customer by ID
router.delete('/:id', deleteCustomer);

export default router;
