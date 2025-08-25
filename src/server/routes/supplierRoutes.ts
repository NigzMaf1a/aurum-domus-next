import express from 'express';
import {
  createSupplier,
  getAllSuppliers,
  getSupplierByID,
  updateSupplier,
  deleteSupplier
} from '../controllers/supplierController';

const router = express.Router();

// Create a new supplier
router.post('/add', createSupplier);

// Get all suppliers
router.get('/get', getAllSuppliers);

// Get single supplier by ID
router.get('/:id', getSupplierByID);

// Update a supplier by ID
router.put('/:id', updateSupplier);

// Delete a supplier by ID
router.delete('/:id', deleteSupplier);

export default router;
