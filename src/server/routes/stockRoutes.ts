import express from 'express';
import {
  addStockItem,
  getStock,
  updateStockItem,
  deleteStockItem
} from '../controllers/stockController';

const stock = express.Router();

// Add new stock item
stock.post('/', addStockItem);

// Get all stock items by unitID (unitID as URL param)
stock.get('/:unitID', getStock);

// Update stock item by stockID
stock.put('/:stockID', updateStockItem);

// Delete stock item by stockID
stock.delete('/:stockID', deleteStockItem);

export default stock;
