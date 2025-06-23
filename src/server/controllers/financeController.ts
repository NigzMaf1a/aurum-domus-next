import { Request, Response } from 'express'
import Finances from '../models/Finances'

interface FinanceUpdatePayload {
  id: string
  updates: Record<string, string> // tighten this if you know the exact shape
}

// CREATE - Add finance record
export const addFinance = async (req: Request, res: Response) => {
  const { unitID, amount, total, balance, transactionType, transactionDate } = req.body
  const finance = new Finances()

  try {
    const result = await finance.addToFinances(unitID, amount, total, balance, transactionType, transactionDate)
    res.status(201).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to add finance record', details: message })
  }
}

// READ - Get finances by unitID query param (required)
export const getFinances = async (req: Request, res: Response) => {
  const unitID = req.query.unitID as string | undefined

  if (!unitID) {
    return res.status(400).json({ error: 'unitID query param is required' })
  }

  const finance = new Finances()

  try {
    const result = await finance.getFinances(unitID)
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to fetch finances', details: message })
  }
}

// UPDATE - Update finance record, requires id and updates object
export const updateFinance = async (req: Request, res: Response) => {
  const { id, updates } = req.body as FinanceUpdatePayload

  if (!id || !updates || typeof updates !== 'object') {
    return res.status(400).json({ error: 'id and updates (object) are required in body' })
  }

  const finance = new Finances()

  try {
    const result = await finance.updateFinance(id, updates)
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to update finance record', details: message })
  }
}

// DELETE - Delete finance record by id param
export const deleteFinance = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ error: 'Finance record ID is required' })
  }

  const finance = new Finances()

  try {
    const result = await finance.deleteFromFinance(id)
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to delete finance record', details: message })
  }
}
