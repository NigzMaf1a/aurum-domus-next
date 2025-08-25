import { Request, Response, RequestHandler } from 'express';
import Manager from '../models/manager';
import { ManagerPayload } from '../interfaces/manager';

const managerService = new Manager();

// CREATE - Add a new manager
export const createManager: RequestHandler = async (req: Request, res: Response) => {
  const manager: ManagerPayload = req.body;

  try {
    const result = await managerService.createManager(manager);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to create manager', details: message });
  }
};

// READ - Get all managers
export const getAllManagers: RequestHandler = async (_req, res) => {
  try {
    const rows = await managerService.getAllManagers();
    res.status(200).json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch managers', details: message });
  }
};

// READ - Get single manager by ID
export const getManagerByID: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid manager ID' });
    return;
  }

  try {
    const manager = await managerService.getManagerByID(id);
    if (!manager) {
      res.status(404).json({ message: 'Manager not found' });
      return;
    }
    res.status(200).json(manager);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch manager', details: message });
  }
};

// UPDATE - Update manager by ID
export const updateManager: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid manager ID' });
    return;
  }

  const manager: ManagerPayload = req.body;

  try {
    const result = await managerService.updateManager(id, manager);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Manager not found or no changes made' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to update manager', details: message });
  }
};

// DELETE - Remove manager by ID
export const deleteManager: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid manager ID' });
    return;
  }

  try {
    const result = await managerService.deleteManager(id);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Manager not found' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to delete manager', details: message });
  }
};
