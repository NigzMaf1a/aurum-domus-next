// routes/ordersRoutes.ts
import { Router } from 'express'
import {
  addOrder,
  getOrders,
  updateOrder,
  deleteOrder
} from '../controllers/orderController'

const router = Router()

// CREATE
router.post('/add', addOrder)

// READ
router.get('/', getOrders)

// UPDATE
router.put('/:orderID', updateOrder)

// DELETE
router.delete('/:orderID', deleteOrder)

export default router
