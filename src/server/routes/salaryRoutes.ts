// routes/salaryRoutes.ts
import { Router } from 'express'
import {
  addSalary,
  getSalaries,
  updateSalary,
  deleteSalary
} from '../controllers/salaryController'

const router = Router()

// CREATE a new salary record
router.post('/', addSalary)

// READ all salary records
router.get('/', getSalaries)

// UPDATE salary record by ID
router.put('/:salaryID', updateSalary)

// DELETE salary record by ID
router.delete('/:salaryID', deleteSalary)

export default router
