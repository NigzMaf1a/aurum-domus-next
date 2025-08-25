import express from 'express';
import {
  createAdmin,
  getAllAdmins,
  getAdminByID,
  updateAdmin,
  deleteAdmin
} from '../controllers/adminController';

const router = express.Router();

// Create a new admin
router.post('/add', createAdmin);

// Get all admins
router.get('/get', getAllAdmins);

// Get single admin by ID
router.get('/:id', getAdminByID);

// Update an admin by ID
router.put('/:id', updateAdmin);

// Delete an admin by ID
router.delete('/:id', deleteAdmin);

export default router;
