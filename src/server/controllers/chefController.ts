import { Request, Response, RequestHandler } from 'express';
import Chef from '../models/chef';
import { ChefPayload } from '../interfaces/chef';

const chefService = new Chef();

// CREATE - Add a new chef
export const createChef: RequestHandler = async (req: Request, res: Response) => {
  const chef: ChefPayload = req.body;

  try {
    const result = await chefService.createChef(chef);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to create chef', details: message });
  }
};

// READ - Get all chefs
export const getAllChefs: RequestHandler = async (_req, res) => {
  try {
    const rows = await chefService.getAllChefs();
    res.status(200).json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch chefs', details: message });
  }
};

// READ - Get single chef by ID
export const getChefByID: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid chef ID' });
    return;
  }

  try {
    const chef = await chefService.getChefByID(id);
    if (!chef) {
      res.status(404).json({ message: 'Chef not found' });
      return;
    }
    res.status(200).json(chef);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch chef', details: message });
  }
};

// UPDATE - Update chef by ID
export const updateChef: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid chef ID' });
    return;
  }

  const chef: ChefPayload = req.body;

  try {
    const result = await chefService.updateChef(id, chef);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Chef not found or no changes made' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to update chef', details: message });
  }
};

// DELETE - Remove chef by ID
export const deleteChef: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid chef ID' });
    return;
  }

  try {
    const result = await chefService.deleteChef(id);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Chef not found' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to delete chef', details: message });
  }
};
