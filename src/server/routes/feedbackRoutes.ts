// routes/feedbackRoutes.ts
import { Router } from 'express'
import {
  addFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback
} from '../controllers/feedbackController'

const router = Router()

// CREATE feedback
router.post('/add', addFeedback)

// READ feedbacks (optionally filter by customerID via query param)
router.get('/', getFeedback)

// UPDATE feedback
router.put('/update', updateFeedback)

// DELETE feedback by ID
router.delete('/:feedbackID', deleteFeedback)

export default router
