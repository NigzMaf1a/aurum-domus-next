import { Request, Response, RequestHandler } from 'express';
import Supplier from '../models/supplier';
import { SupplierPayload } from '../interfaces/supplier';

const supplierService = new Supplier();

// CREATE - Add a new supplier
export const createSupplier: RequestHandler = async (req: Request, res: Response) => {
  const supplier: SupplierPayload = req.body;

  try {
    const result = await supplierService.createSupplier(supplier);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to create supplier', details: message });
  }
};

// READ - Get all suppliers
export const getAllSuppliers: RequestHandler = async (_req, res) => {
  try {
    const rows = await supplierService.getAllSuppliers();
    res.status(200).json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch suppliers', details: message });
  }
};

// READ - Get single supplier by ID
export const getSupplierByID: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid supplier ID' });
    return;
  }

  try {
    const supplier = await supplierService.getSupplierByID(id);
    if (!supplier) {
      res.status(404).json({ message: 'Supplier not found' });
      return;
    }
    res.status(200).json(supplier);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch supplier', details: message });
  }
};

// UPDATE - Update supplier by ID
export const updateSupplier: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid supplier ID' });
    return;
  }

  const supplier: SupplierPayload = req.body;

  try {
    const result = await supplierService.updateSupplier(id, supplier);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Supplier not found or no changes made' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to update supplier', details: message });
  }
};

// DELETE - Remove supplier by ID
export const deleteSupplier: RequestHandler<{ id: string }> = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid supplier ID' });
    return;
  }

  try {
    const result = await supplierService.deleteSupplier(id);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Supplier not found' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to delete supplier', details: message });
  }
};
