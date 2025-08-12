// controllers/salaryController.ts
import { Request, Response, RequestHandler } from 'express';
import Salary from '../models/Salary';

// CREATE - Add a new salary record
export const addSalary = async (req: Request, res: Response) => {
  const salaryService = new Salary();

  try {
    const result = await salaryService.addSalary(req.body);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to add salary', details: message });
  }
};

// READ - Get all salary records
export const getSalaries = async (req: Request, res: Response) => {
  const salaryService = new Salary();

  try {
    const rows = await salaryService.getSalaries();
    res.status(200).json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: 'Failed to fetch salaries', details: message });
  }
};

// UPDATE - Update a salary record by ID
export const updateSalary: RequestHandler = async (req, res, next) => {
  try {
    const salaryID = Number(req.params.salaryID);
    if (isNaN(salaryID)) {
      res.status(400).json({ error: 'Invalid salaryID' });
      return;
    }

    const updates = req.body;
    if (!updates || typeof updates !== 'object') {
      res.status(400).json({ error: 'Updates object is required' });
      return;
    }

    const salaryService = new Salary();
    const result = await salaryService.updateSalary(salaryID, updates);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Salary record not found or no changes made' });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// DELETE - Delete a salary record by ID
export const deleteSalary: RequestHandler = async (req, res, next) => {
  try {
    const salaryID = Number(req.params.salaryID);
    if (isNaN(salaryID)) {
      res.status(400).json({ error: 'Invalid salaryID' });
      return;
    }

    const salaryService = new Salary();
    const result = await salaryService.deleteSalary(salaryID);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Salary record not found' });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
