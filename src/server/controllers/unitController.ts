// controllers/unitController.ts
import { Request, Response, RequestHandler } from 'express';
import Unit from '../models/Unit';
import { UnitPayload } from '../models/Unit';


const unitService = new Unit();

// CREATE - Add new unit
export const addUnit = async (
  req: Request,
  res: Response
) => {
  // const { unitName, unitEmail, unitPhone, unitLocation, unitBalance, employees } = req.body;
  const unit:UnitPayload = req.body;

  try {
    const result = await unitService.addUnit(
      unit
      // unitName,
      // unitEmail,
      // unitPhone,
      // unitLocation,
      // unitBalance,
      // employees
    );
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to add unit', details: message });
  }
};

// READ - Get all units
export const getUnits = async (req: Request, res: Response) => {
  try {
    const rows = await unitService.getUnits();
    res.status(200).json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch units', details: message });
  }
};

// UPDATE - Update a unit by unitID
export const updateUnit: RequestHandler = async (req, res, next) => {
  try {
    const unitID = Number(req.params.unitID);
    if (isNaN(unitID)) {
      res.status(400).json({ error: 'Invalid unitID' });
      return;
    }

    const unit: UnitPayload = req.body;

    const result = await unitService.updateUnit(unitID, unit);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Unit not found or no changes made' });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// DELETE - Remove a unit by unitID
export const deleteUnit: RequestHandler = async (req, res, next) => {
  try {
    const unitID = Number(req.params.unitID);
    if (isNaN(unitID)) {
      res.status(400).json({ error: 'Invalid unitID' });
      return;
    }

    const result = await unitService.deleteUnit(unitID);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Unit not found' });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
