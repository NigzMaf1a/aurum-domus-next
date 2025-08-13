// controllers/rollcallController.ts
import { Request, RequestHandler } from 'express';
import Rollcall from '../models/RollCall';

// Helper to securely extract unitID (assumes middleware or token injection)
const getUnitID = (req: Request & { unitID?: number }): string | undefined => {
  return req.unitID || req.body.unitID;
};

// CREATE - Add a new roll call entry
export const addRollCall: RequestHandler = async (req, res) => {
  const unitID = Number(getUnitID(req))
  if (isNaN(unitID)) {
    res.status(400).json({ error: 'unitID is required or invalid' })
    return
  }

  const rollcallService = new Rollcall(unitID)

  try {
    const result = await rollcallService.addRollCall(req.body)
    res.status(201).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to add roll call', details: message })
  }
}

// READ - Get all roll calls for the unit
export const getRollCalls: RequestHandler = async (req, res) => {
  const unitID = Number(getUnitID(req))
  if (isNaN(unitID)) {
    res.status(400).json({ error: 'unitID is required or invalid' })
    return
  }

  const rollcallService = new Rollcall(unitID)

  try {
    const rows = await rollcallService.getRollCalls()
    res.status(200).json(rows)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to fetch roll calls', details: message })
  }
}

// UPDATE - Update roll call by ID
export const updateRollCall: RequestHandler<{ rollCallID: string }> = async (req, res) => {
  const unitID = Number(getUnitID(req))
  if (isNaN(unitID)) {
    res.status(400).json({ error: 'unitID is required or invalid' })
    return
  }

  const rollCallID = Number(req.params.rollCallID)
  if (isNaN(rollCallID)) {
    res.status(400).json({ error: 'rollCallID is required or invalid' })
    return
  }

  const updatedFields = req.body
  const rollcallService = new Rollcall(unitID)

  try {
    const result = await rollcallService.updateRollCall(rollCallID, updatedFields)
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Roll call not found or no changes' })
      return
    }
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to update roll call', details: message })
  }
}

// DELETE - Delete roll call by ID
export const deleteRollCall: RequestHandler<{ rollCallID: string }> = async (req, res) => {
  const unitID = Number(getUnitID(req))
  if (isNaN(unitID)) {
    res.status(400).json({ error: 'unitID is required or invalid' })
    return
  }

  const rollCallID = Number(req.params.rollCallID)
  if (isNaN(rollCallID)) {
    res.status(400).json({ error: 'rollCallID is required or invalid' })
    return
  }

  const rollcallService = new Rollcall(unitID)

  try {
    const result = await rollcallService.deleteRollCall(rollCallID)
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Roll call not found' })
      return
    }
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to delete roll call', details: message })
  }
}

// READ - Get all present roll calls
export const getPresent: RequestHandler = async (req, res) => {
  const unitID = Number(getUnitID(req))
  if (isNaN(unitID)) {
    res.status(400).json({ error: 'unitID is required or invalid' })
    return
  }

  const rollcallService = new Rollcall(unitID)

  try {
    const rows = await rollcallService.getPresent()
    res.status(200).json(rows)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to fetch present roll calls', details: message })
  }
}

// READ - Get all absent roll calls
export const getAbsent: RequestHandler = async (req, res) => {
  const unitID = Number(getUnitID(req))
  if (isNaN(unitID)) {
    res.status(400).json({ error: 'unitID is required or invalid' })
    return
  }

  const rollcallService = new Rollcall(unitID)

  try {
    const rows = await rollcallService.getAbsent()
    res.status(200).json(rows)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to fetch absent roll calls', details: message })
  }
}
