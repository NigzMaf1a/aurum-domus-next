import { Request, Response, RequestHandler } from 'express';
import Owner from '../models/owner';
import { OwnerPayload } from '../interfaces/owner';

const ownerService = new Owner();

// CREATE - Add a new owner
export const createOwner: RequestHandler = async (req: Request, res: Response) => {
  const owner: OwnerPayload = req.body;

  try {
    const result = await ownerService.createOwner(owner);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to create owner', details: message });
  }
};

// READ - Get all owners
export const getAllOwners: RequestHandler = async (_req, res) => {
  try {
    const rows = await ownerService.getAllOwners();
    res.status(200).json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch owners', details: message });
  }
};

// READ - Get single owner by ID
export const getOwnerByID: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid owner ID' });
    return;
  }

  try {
    const owner = await ownerService.getOwnerByID(id);
    if (!owner) {
      res.status(404).json({ message: 'Owner not found' });
      return;
    }
    res.status(200).json(owner);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch owner', details: message });
  }
};

// UPDATE - Update owner by ID
export const updateOwner: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid owner ID' });
    return;
  }

  const owner: OwnerPayload = req.body;

  try {
    const result = await ownerService.updateOwner(id, owner);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Owner not found or no changes made' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to update owner', details: message });
  }
};

// DELETE - Remove owner by ID
export const deleteOwner: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid owner ID' });
    return;
  }

  try {
    const result = await ownerService.deleteOwner(id);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Owner not found' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to delete owner', details: message });
  }
};
