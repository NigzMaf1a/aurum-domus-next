import express from 'express';
import {
  addUnit,
  getUnits,
  updateUnit,
  deleteUnit
} from '../controllers/unitController';

const router = express.Router();

// Create a new unit
router.post('/', addUnit);

// Get all units
router.get('/', getUnits);

// Update a unit by ID
router.put('/:unitID', updateUnit);

// Delete a unit by ID
router.delete('/:unitID', deleteUnit);

export default router;
