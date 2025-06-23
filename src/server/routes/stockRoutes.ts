import express from 'express';
import {
  addStockItem,
  getStock,
  updateStockItem,
  deleteStockItem
} from '../controllers/stockController.js';

const router = express.Router();

// Add new stock item
router.post('/', addStockItem);

// Get all stock items by unitID (unitID as URL param)
router.get('/:unitID', getStock);

// Update stock item by stockID
router.put('/:stockID', updateStockItem);

// Delete stock item by stockID
router.delete('/:stockID', deleteStockItem);

export default router;
