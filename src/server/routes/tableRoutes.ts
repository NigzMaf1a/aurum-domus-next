// routes/tableRoutes.ts
import { Router } from 'express'
import {
  addTable,
  getTables,
  vacantTables,
  occupiedTables,
  updateTable,
  deleteTable
} from '../controllers/tableController'

const router = Router()

// CREATE
router.post('/add', addTable)

// READ
router.get('/:unitID/all', getTables)
router.get('/:unitID/vacant', vacantTables)
router.get('/:unitID/occupied', occupiedTables)

// UPDATE
router.put('/update', updateTable)

// DELETE
router.delete('/delete', deleteTable)

export default router
