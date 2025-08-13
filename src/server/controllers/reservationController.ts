import { Request, RequestHandler } from 'express'
import Reservation from '../models/Reservation'
import { AddReservationPayload } from '../interfaces/reservation'
import { ReservationRow } from '../interfaces/reservation'

// Extended type for optional unitID
interface AuthenticatedRequest extends Request {
  unitID?: number
}

// Helper to get unitID as a number
const getUnitID = (req: Request): number | undefined => {
  const id = (req as AuthenticatedRequest).unitID || (req.body as ReservationRow).unitID
  return typeof id === 'number' ? id : Number(id) || undefined
}

// CREATE - Add reservation
export const addReservation: RequestHandler = async (req, res) => {
  const unitID = getUnitID(req)
  if (!unitID) {
    res.status(400).json({ error: 'unitID is required' })
    return
  }

  const reservationService = new Reservation()
  const payload = req.body as AddReservationPayload

  try {
    const result = await reservationService.addReservation(unitID, payload)
    res.status(201).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to add reservation', details: message })
  }
}


// READ - Get reservations
export const getReservations: RequestHandler = async (req, res) => {
  const unitID = getUnitID(req)
  if (!unitID) {
    res.status(400).json({ error: 'unitID is required' })
    return
  }

  const reservationService = new Reservation()

  try {
    const rows = await reservationService.getReservations(unitID)
    res.status(200).json(rows)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to fetch reservations', details: message })
  }
}


// UPDATE - Update reservation
export const updateReservation: RequestHandler<{ reservationID: string }> = async (req, res) => {
  const unitID = getUnitID(req)
  if (!unitID) {
    res.status(400).json({ error: 'unitID is required' })
    return
  }

  const { reservationID } = req.params
  const updatedFields = req.body

  const reservationService = new Reservation()

  try {
    const result = await reservationService.updateReservation(unitID, Number(reservationID), updatedFields)
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Reservation not found or no changes made' })
      return
    }
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to update reservation', details: message })
  }
}


// DELETE - Delete reservation
export const deleteReservation: RequestHandler<{ reservationID: string }> = async (req, res) => {
  const unitID = getUnitID(req)
  if (!unitID) {
    res.status(400).json({ error: 'unitID is required' })
    return
  }

  const { reservationID } = req.params
  const reservationService = new Reservation()

  try {
    const result = await reservationService.deleteReservation(unitID, Number(reservationID))
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Reservation not found' })
      return
    }
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to delete reservation', details: message })
  }
}

