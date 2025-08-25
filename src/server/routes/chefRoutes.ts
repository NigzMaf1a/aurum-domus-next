import express from 'express';
import {
  createChef,
  getAllChefs,
  getChefByID,
  updateChef,
  deleteChef
} from '../controllers/chefController';

const router = express.Router();

// Create a new chef
router.post('/add', createChef);

// Get all chefs
router.get('/get', getAllChefs);

// Get single chef by ID
router.get('/:id', getChefByID);

// Update a chef by ID
router.put('/:id', updateChef);

// Delete a chef by ID
router.delete('/:id', deleteChef);

export default router;
