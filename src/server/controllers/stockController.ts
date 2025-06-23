// controllers/stockController.ts
import { Request, Response } from 'express';
import Stock from '../models/Stock';

const stockService = new Stock();

// CREATE - Add new stock item
export const add = async (req: Request, res: Response) => {
  try {
    const result = await stockService.addStockItem(req.body);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to add stock item', details: message });
  }
};

// READ - Get stock items by unitID
export const getAll = async (req: Request & { params: { unitID: string } }, res: Response) => {
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
export const update = async (
  req: Request & { params: { stockID: string } },
  res: Response
) => {
  const { stockID } = req.params;
  const { itemName, quantity, price } = req.body;

  try {
    const result = await stockService.updateStockItem(stockID, itemName, quantity, price);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Stock item not found or no changes made' });
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to update stock item', details: message });
  }
};

// DELETE - Delete a stock item by stockID
export const remove = async (
  req: Request & { params: { stockID: string } },
  res: Response
) => {
  const { stockID } = req.params;

  try {
    const result = await stockService.deleteStockItem(stockID);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Stock item not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to delete stock item', details: message });
  }
};
