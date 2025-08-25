import { Request, Response, RequestHandler } from 'express';
import Admin from '../models/admin';
import { AdminPayload } from '../interfaces/admin';

const adminService = new Admin();

// CREATE - Add a new admin
export const createAdmin: RequestHandler = async (req: Request, res: Response) => {
  const admin: AdminPayload = req.body;

  try {
    const result = await adminService.createAdmin(admin);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to create admin', details: message });
  }
};

// READ - Get all admins
export const getAllAdmins: RequestHandler = async (_req, res) => {
  try {
    const rows = await adminService.getAllAdmins();
    res.status(200).json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch admins', details: message });
  }
};

// READ - Get single admin by ID
export const getAdminByID: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid admin ID' });
    return;
  }

  try {
    const admin = await adminService.getAdminByID(id);
    if (!admin) {
      res.status(404).json({ message: 'Admin not found' });
      return;
    }
    res.status(200).json(admin);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch admin', details: message });
  }
};

// UPDATE - Update admin by ID
export const updateAdmin: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid admin ID' });
    return;
  }

  const admin: AdminPayload = req.body;

  try {
    const result = await adminService.updateAdmin(id, admin);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Admin not found or no changes made' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to update admin', details: message });
  }
};

// DELETE - Remove admin by ID
export const deleteAdmin: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid admin ID' });
    return;
  }

  try {
    const result = await adminService.deleteAdmin(id);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Admin not found' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to delete admin', details: message });
  }
};
