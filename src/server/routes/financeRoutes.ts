// routes/financeRoutes.ts
import { Router } from 'express'
import {
  addFinance,
  getFinances,
  updateFinance,
  deleteFinance
} from '../controllers/financeController'

const router = Router()

// CREATE
router.post('/add', addFinance)

// READ by unitID (pass unitID as query param if needed)
router.get('/', getFinances)

// UPDATE
router.put('/update', updateFinance)

// DELETE
router.delete('/:id', deleteFinance)

export default router
