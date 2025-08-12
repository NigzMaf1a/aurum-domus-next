import { Request, Response } from 'express'
import Reservation from '../models/Reservation'

// Extend Request type to include unitID if you're getting it from middleware
interface AuthenticatedRequest extends Request {
  unitID?: string
}

interface AddReservationPayload {
  tableID: number
  customerID: number
  orderID: number
  dishID: number
  dishName: string
  plates: number
  orderPrice: number
  paymentStatus: string
  reservationDate: string // or Date if parsed
  reservationTime: string // or Date if parsed
}

interface UpdateReservationPayload {
  [key: string]: unknown // Or more specific keys if you want stricter typing
}

// Helper to extract unitID securely
const getUnitID = (req: AuthenticatedRequest): string | undefined => {
  return req.unitID || req.body.unitID
}

// CREATE - Add reservation
export const addReservation = async (req: AuthenticatedRequest, res: Response) => {
  const unitID = getUnitID(req)
  if (!unitID) return res.status(400).json({ error: 'unitID is required' })

  const reservationService = new Reservation()
  reservationService.unitID = unitID

  const payload = req.body as AddReservationPayload

  try {
    const result = await reservationService.addReservation(payload)
    res.status(201).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to add reservation', details: message })
  }
}

// READ - Get reservations
export const getReservations = async (req: AuthenticatedRequest, res: Response) => {
  const unitID = getUnitID(req)
  if (!unitID) return res.status(400).json({ error: 'unitID is required' })

  const reservationService = new Reservation()
  reservationService.unitID = unitID

  try {
    const rows = await reservationService.getReservations()
    res.status(200).json(rows)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to fetch reservations', details: message })
  }
}

// UPDATE - Update reservation
export const updateReservation = async (
  req: AuthenticatedRequest & { params: { reservationID: string } },
  res: Response
) => {
  const unitID = getUnitID(req)
  if (!unitID) return res.status(400).json({ error: 'unitID is required' })

  const { reservationID } = req.params
  const updatedFields = req.body as UpdateReservationPayload

  const reservationService = new Reservation()
  reservationService.unitID = unitID

  try {
    const result = await reservationService.updateReservation(reservationID, updatedFields)
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reservation not found or no changes made' })
    }
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to update reservation', details: message })
  }
}

// DELETE - Delete reservation
export const deleteReservation = async (
  req: AuthenticatedRequest & { params: { reservationID: string } },
  res: Response
) => {
  const unitID = getUnitID(req)
  if (!unitID) return res.status(400).json({ error: 'unitID is required' })

  const { reservationID } = req.params

  const reservationService = new Reservation()
  reservationService.unitID = unitID

  try {
    const result = await reservationService.deleteReservation(reservationID)
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reservation not found' })
    }
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to delete reservation', details: message })
  }
}
