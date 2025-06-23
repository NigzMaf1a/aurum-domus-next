// routes/paymentRoutes.ts
import { Router } from 'express'
import { addPayment, getPayments } from '../controllers/paymentController'

const router = Router()

// CREATE
router.post('/add', addPayment)

// READ
router.get('/', getPayments)

export default router
