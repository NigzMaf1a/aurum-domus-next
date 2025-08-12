// controllers/tableController.ts
import { Request, Response } from 'express'
import Table from '../models/Table'

// CREATE - Add new table
export const addTable = async (req: Request, res: Response) => {
  const { unitID, tableName, status } = req.body
  const tableService = new Table(unitID)

  try {
    const result = await tableService.addTable(tableName, status)
    res.status(201).json(result)
  } catch (err) {
    console.error('Add Table Error:', err)
    res.status(500).json({ error: 'Failed to add table' })
  }
}

// READ - Get all tables in a unit
export const getTables = async (req: Request, res: Response) => {
  const { unitID } = req.params
  const tableService = new Table(unitID)

  try {
    const result = await tableService.getAllTables()
    res.status(200).json(result)
  } catch (err) {
    console.error('Get All Tables Error:', err)
    res.status(500).json({ error: 'Failed to fetch tables' })
  }
}

// READ - Get all vacant tables in a unit
export const vacantTables = async (req: Request, res: Response) => {
  const { unitID } = req.params
  const tableService = new Table(unitID)

  try {
    const result = await tableService.getVacantTables()
    res.status(200).json(result)
  } catch (err) {
    console.error('Get Vacant Tables Error:', err)
    res.status(500).json({ error: 'Failed to fetch vacant tables' })
  }
}

// READ - Get all occupied tables in a unit
export const occupiedTables = async (req: Request, res: Response) => {
  const { unitID } = req.params
  const tableService = new Table(unitID)

  try {
    const result = await tableService.getOccupiedTables()
    res.status(200).json(result)
  } catch (err) {
    console.error('Get Occupied Tables Error:', err)
    res.status(500).json({ error: 'Failed to fetch occupied tables' })
  }
}

// UPDATE - Update a table's info
export const updateTable = async (req: Request, res: Response) => {
  const { unitID, tableID, tableName, status } = req.body
  const tableService = new Table(unitID)

  try {
    const result = await tableService.updateTable(tableID, tableName, status)
    res.status(200).json(result)
  } catch (err) {
    console.error('Update Table Error:', err)
    res.status(500).json({ error: 'Failed to update table' })
  }
}

// DELETE - Remove a table from a unit
export const deleteTable = async (req: Request, res: Response) => {
  const { unitID, tableID } = req.body
  const tableService = new Table(unitID)

  try {
    const result = await tableService.deleteTable(tableID)
    res.status(200).json(result)
  } catch (err) {
    console.error('Delete Table Error:', err)
    res.status(500).json({ error: 'Failed to delete table' })
  }
}
