import { Router } from 'express';
import {
  addOrder,
  getOrders,
  updateOrder,
  deleteOrder
} from '../controllers/orderController';

const router = Router();

// CREATE
router.post('/add', addOrder);

// READ (expects unitID in query, e.g. /api/order/get?unitID=2)
router.get('/get', getOrders);

// UPDATE (expects orderID in params, e.g. /api/order/5?unitID=2)
router.put('/:orderID', updateOrder);

// DELETE (expects orderID in params, e.g. /api/order/5?unitID=2)
router.delete('/:orderID', deleteOrder);

export default router;
