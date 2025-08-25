import { Request, Response, RequestHandler } from 'express';
import Waiter from '../models/waiter';
import { WaiterPayload } from '../interfaces/waiter';

const waiterService = new Waiter();

// CREATE - Add a new waiter
export const createWaiter: RequestHandler = async (req: Request, res: Response) => {
  const waiter: WaiterPayload = req.body;

  try {
    const result = await waiterService.createWaiter(waiter);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to create waiter', details: message });
  }
};

// READ - Get all waiters
export const getAllWaiters: RequestHandler = async (_req, res) => {
  try {
    const rows = await waiterService.getAllWaiters();
    res.status(200).json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch waiters', details: message });
  }
};

// READ - Get single waiter by ID
export const getWaiterByID: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid waiter ID' });
    return;
  }

  try {
    const waiter = await waiterService.getWaiterByID(id);
    if (!waiter) {
      res.status(404).json({ message: 'Waiter not found' });
      return;
    }
    res.status(200).json(waiter);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch waiter', details: message });
  }
};

// UPDATE - Update waiter by ID
export const updateWaiter: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid waiter ID' });
    return;
  }

  const waiter: WaiterPayload = req.body;

  try {
    const result = await waiterService.updateWaiter(id, waiter);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Waiter not found or no changes made' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to update waiter', details: message });
  }
};

// DELETE - Remove waiter by ID
export const deleteWaiter: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid waiter ID' });
    return;
  }

  try {
    const result = await waiterService.deleteWaiter(id);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Waiter not found' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to delete waiter', details: message });
  }
};
