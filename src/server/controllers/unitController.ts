// controllers/unitController.ts
import { Request, Response } from 'express';
import Unit from '../models/Unit';

const unitService = new Unit();

// CREATE - Add new unit
export const add = async (
  req: Request,
  res: Response
) => {
  const { unitName, unitEmail, unitPhone, unitLocation, unitBalance, employees } = req.body;

  try {
    const result = await unitService.addUnit(
      unitName,
      unitEmail,
      unitPhone,
      unitLocation,
      unitBalance,
      employees
    );
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to add unit', details: message });
  }
};

// READ - Get all units
export const getAll = async (req: Request, res: Response) => {
  try {
    const rows = await unitService.getUnits();
    res.status(200).json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch units', details: message });
  }
};

// UPDATE - Update a unit by unitID
export const update = async (
  req: Request & { params: { unitID: string } },
  res: Response
) => {
  const { unitID } = req.params;
  const { unitName, unitEmail, unitPhone, unitLocation, unitBalance, employees } = req.body;

  try {
    const result = await unitService.updateUnit(
      unitID,
      unitName,
      unitEmail,
      unitPhone,
      unitLocation,
      unitBalance,
      employees
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Unit not found or no changes made' });
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to update unit', details: message });
  }
};

// DELETE - Remove a unit by unitID
export const remove = async (
  req: Request & { params: { unitID: string } },
  res: Response
) => {
  const { unitID } = req.params;

  try {
    const result = await unitService.deleteUnit(unitID);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Unit not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to delete unit', details: message });
  }
};
