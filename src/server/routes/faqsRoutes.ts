// routes/faqsRoutes.ts
import { Router } from 'express'
import {
  addFaq,
  getFaqs,
  updateFaq,
  deleteFaq
} from '../controllers/faqsController'

const router = Router()

// CREATE
router.post('/add', addFaq)

// READ
router.get('/', getFaqs)

// UPDATE
router.put('/update', updateFaq)

// DELETE
router.delete('/:faqID', deleteFaq)

export default router
