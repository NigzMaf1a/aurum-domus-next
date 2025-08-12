import { Request, Response, RequestHandler } from 'express'
import Finances from '../models/Finances'

// interface FinanceUpdatePayload {
//   id: string
//   updates: Record<string, string> // tighten this if you know the exact shape
// }

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
export const getFinances: RequestHandler = async (req, res, next) => {
  try {
    const unitID = req.query.unitID as string | undefined

    if (!unitID) {
      res.status(400).json({ error: 'unitID query param is required' })
      return
    }

    const finance = new Finances()
    const result = await finance.getFinances(unitID)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

// UPDATE - Update finance record, requires id and updates object
export const updateFinance: RequestHandler = async (req, res, next) => {
  try {
    const { id, updates } = req.body as { id?: string | number; updates?: Record<string, unknown> }

    // Convert id to number explicitly
    const numericId = Number(id)

    if (isNaN(numericId) || !updates || typeof updates !== 'object') {
      res.status(400).json({ error: 'Valid numeric id and updates (object) are required in body' })
      return
    }

    const finance = new Finances()
    const result = await finance.updateFinance(numericId, updates)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

// DELETE - Delete finance record by id param
export const deleteFinance: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      res.status(400).json({ error: 'Valid numeric finance record ID is required' })
      return
    }

    const finance = new Finances()
    const result = await finance.deleteFromFinance(id)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
