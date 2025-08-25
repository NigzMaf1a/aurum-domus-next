import { Request, Response, RequestHandler } from 'express';
import Accountant from '../models/accountant';
import { AccountantPayload } from '../interfaces/accountant';

const accountantService = new Accountant();

// CREATE - Add a new accountant
export const createAccountant: RequestHandler = async (req: Request, res: Response) => {
  const accountant: AccountantPayload = req.body;

  try {
    const result = await accountantService.createAccountant(accountant);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to create accountant', details: message });
  }
};

// READ - Get all accountants
export const getAllAccountants: RequestHandler = async (_req, res) => {
  try {
    const rows = await accountantService.getAllAccountants();
    res.status(200).json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch accountants', details: message });
  }
};

// READ - Get single accountant by ID
export const getAccountantByID: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid accountant ID' });
    return;
  }

  try {
    const accountant = await accountantService.getAccountantByID(id);
    if (!accountant) {
      res.status(404).json({ message: 'Accountant not found' });
      return;
    }
    res.status(200).json(accountant);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch accountant', details: message });
  }
};

// UPDATE - Update accountant by ID
export const updateAccountant: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid accountant ID' });
    return;
  }

  const accountant: AccountantPayload = req.body;

  try {
    const result = await accountantService.updateAccountant(id, accountant);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Accountant not found or no changes made' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to update accountant', details: message });
  }
};

// DELETE - Remove accountant by ID
export const deleteAccountant: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid accountant ID' });
    return;
  }

  try {
    const result = await accountantService.deleteAccountant(id);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Accountant not found' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to delete accountant', details: message });
  }
};
