// routes/reservationRoutes.ts
import { Router } from 'express'
import {
  addReservation,
  getReservations,
  updateReservation,
  deleteReservation
} from '../controllers/reservationController'

const router = Router()

// CREATE
router.post('/add', addReservation)

// READ
router.get('/', getReservations)

// UPDATE
router.put('/:reservationID', updateReservation)

// DELETE
router.delete('/:reservationID', deleteReservation)

export default router
