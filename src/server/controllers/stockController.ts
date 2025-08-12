// controllers/stockController.ts
import { Request, Response, RequestHandler } from 'express';
import Stock from '../models/Stock';
import StockItem from '@/interfaces/stockItem';

const stockService = new Stock();

// CREATE - Add new stock item
export const addStockItem = async (req: Request, res: Response) => {
  try {
    const result = await stockService.addStockItem(req.body);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to add stock item', details: message });
  }
};

// READ - Get stock items by unitID
export const getStock = async (req: Request & { params: { unitID: number } }, res: Response) => {
  const { unitID } = req.params;

  try {
    const rows = await stockService.getStock(unitID);
    res.status(200).json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch stock', details: message });
  }
};

// UPDATE - Update a stock item by stockID
export const updateStockItem: RequestHandler = async (req, res, next) => {
  try {
    const stockID = Number(req.params.stockID);
    if (isNaN(stockID)) {
      res.status(400).json({ error: 'Invalid stockID' });
      return;
    }

    // Partial updates — only keys user sends
    const updates: Partial<Omit<StockItem, 'StockID'>> = req.body;

    if (!updates || typeof updates !== 'object' || Object.keys(updates).length === 0) {
      res.status(400).json({ error: 'Updates object is required and cannot be empty' });
      return;
    }

    const result = await stockService.updateStockItem(stockID, updates);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Stock item not found or no changes made' });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// DELETE - Delete a stock item by stockID
export const deleteStockItem: RequestHandler = async (req, res, next) => {
  try {
    const stockID = Number(req.params.stockID);
    if (isNaN(stockID)) {
      res.status(400).json({ error: 'Invalid stockID' });
      return;
    }

    const result = await stockService.deleteStockItem(stockID);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Stock item not found' });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
