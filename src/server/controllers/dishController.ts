import { Request, RequestHandler } from 'express';
import Dish from '../models/dishes';
import { AddDishPayload, DishRow } from '../interfaces/dishes';

interface AuthenticatedRequest extends Request {
  unitID?: number;
}

const getUnitID = (req: Request): number | undefined => {
  const id = (req as AuthenticatedRequest).unitID || (req.body as DishRow).unitID;
  return typeof id === 'number' ? id : Number(id) || undefined;
};

// CREATE
export const addDish: RequestHandler = async (req, res) => {
  const unitID = getUnitID(req);
  if (!unitID) {
    res.status(400).json({ error: 'unitID is required' });
    return;
  }

  const dishService = new Dish();
  const payload = req.body as AddDishPayload;

  try {
    const result = await dishService.addDish(unitID, payload);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to add dish', details: message });
  }
};

// READ
export const getDishes: RequestHandler = async (req, res) => {
  const unitID = getUnitID(req);
  if (!unitID) {
    res.status(400).json({ error: 'unitID is required' });
    return;
  }

  const dishService = new Dish();
  try {
    const rows = await dishService.getDishes(unitID);
    res.status(200).json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch dishes', details: message });
  }
};

// UPDATE
export const updateDish: RequestHandler<{ dishID: string }> = async (req, res) => {
  const unitID = getUnitID(req);
  if (!unitID) {
    res.status(400).json({ error: 'unitID is required' });
    return;
  }

  const { dishID } = req.params;
  const updatedFields = req.body;
  const dishService = new Dish();

  try {
    const result = await dishService.updateDish(unitID, Number(dishID), updatedFields);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Dish not found or no changes made' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to update dish', details: message });
  }
};

// DELETE
export const deleteDish: RequestHandler<{ dishID: string }> = async (req, res) => {
  const unitID = getUnitID(req);
  if (!unitID) {
    res.status(400).json({ error: 'unitID is required' });
    return;
  }

  const { dishID } = req.params;
  const dishService = new Dish();

  try {
    const result = await dishService.deleteDish(unitID, Number(dishID));
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Dish not found' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to delete dish', details: message });
  }
};
