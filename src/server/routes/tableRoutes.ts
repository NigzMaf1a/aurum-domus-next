// routes/tableRoutes.ts
import { Router } from 'express'
import {
  add,
  getAll,
  vacant,
  occupied,
  update,
  deleteTable
} from '../controllers/tableController'

const router = Router()

// CREATE
router.post('/add', add)

// READ
router.get('/:unitID/all', getAll)
router.get('/:unitID/vacant', vacant)
router.get('/:unitID/occupied', occupied)

// UPDATE
router.put('/update', update)

// DELETE
router.delete('/delete', deleteTable)

export default router
