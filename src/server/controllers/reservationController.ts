import { Request, Response } from 'express'
import Reservation from '../models/Reservation'
import { AddReservationPayload } from '../interfaces/reservation'

interface AuthenticatedRequest extends Request {
  unitID?: string
}

// Helper to get unitID
const getUnitID = (req: AuthenticatedRequest): string | undefined => {
  return req.unitID || req.body.unitID
}

// CREATE
export const addReservation = async (req: AuthenticatedRequest, res: Response) => {
  const unitID = getUnitID(req)
  if (!unitID) return res.status(400).json({ error: 'unitID is required' })

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

// READ
export const getReservations = async (req: AuthenticatedRequest, res: Response) => {
  const unitID = getUnitID(req)
  if (!unitID) return res.status(400).json({ error: 'unitID is required' })

  const reservationService = new Reservation()

  try {
    const rows = await reservationService.getReservations(unitID)
    res.status(200).json(rows)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to fetch reservations', details: message })
  }
}

// UPDATE
export const updateReservation = async (
  req: AuthenticatedRequest & { params: { reservationID: string } },
  res: Response
) => {
  const unitID = getUnitID(req)
  if (!unitID) return res.status(400).json({ error: 'unitID is required' })

  const { reservationID } = req.params
  const updatedFields = req.body

  const reservationService = new Reservation()

  try {
    const result = await reservationService.updateReservation(unitID, Number(reservationID), updatedFields)
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Reservation not found or no changes made' })
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to update reservation', details: message })
  }
}

// DELETE
export const deleteReservation = async (
  req: AuthenticatedRequest & { params: { reservationID: string } },
  res: Response
) => {
  const unitID = getUnitID(req)
  if (!unitID) return res.status(400).json({ error: 'unitID is required' })

  const { reservationID } = req.params
  const reservationService = new Reservation()

  try {
    const result = await reservationService.deleteReservation(unitID, Number(reservationID))
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Reservation not found' })
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to delete reservation', details: message })
  }
}
