// routes/rollcallRoutes.ts
import { Router } from 'express'
import {
  addRollCall,
  getRollCalls,
  updateRollCall,
  deleteRollCall,
  getPresent,
  getAbsent
} from '../controllers/rollcallController'

const router = Router()

// CREATE
router.post('/', addRollCall)

// READ all
router.get('/', getRollCalls)

// READ present only
router.get('/present', getPresent)

// READ absent only
router.get('/absent', getAbsent)

// UPDATE by ID
router.put('/:rollCallID', updateRollCall)

// DELETE by ID
router.delete('/:rollCallID', deleteRollCall)

export default router
