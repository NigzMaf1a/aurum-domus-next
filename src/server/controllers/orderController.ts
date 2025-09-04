import { Request, RequestHandler } from 'express'
import Orders from '../models/Orders'
import { AddOrderPayload, OrderRow } from '../interfaces/orders'

// Extended type for optional unitID
interface AuthenticatedRequest extends Request {
  unitID?: number
}

// Helper to get unitID as a number
const getUnitID = (req: Request): number | undefined => {
  const id = (req as AuthenticatedRequest).unitID || (req.body as OrderRow).unitID
  return typeof id === 'number' ? id : Number(id) || undefined
}

// CREATE - Add order
export const addOrder: RequestHandler = async (req, res) => {
  const unitID = getUnitID(req)
  if (!unitID) {
    res.status(400).json({ error: 'unitID is required' })
    return
  }

  const ordersService = new Orders()
  const payload = req.body as AddOrderPayload

  try {
    const result = await ordersService.addOrder(unitID, payload)
    res.status(201).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to add order', details: message })
  }
}

// READ - Get orders
export const getOrders: RequestHandler = async (req, res) => {
  // Try to get the unitID from request (query, body, params, headers, etc.)
  let unitID = Number(req.query.unitID);

  // Default to UnitID = 1 if none provided
  if (!unitID) {
    console.warn("⚠️ No unitID provided. Defaulting to 1.");
    unitID = 1;
  }

  const ordersService = new Orders();

  try {
    const rows = await ordersService.getOrders(unitID);
    res.status(200).json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("DB error details:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch orders", details: message });
  }
};



// UPDATE - Update order
export const updateOrder: RequestHandler<{ orderID: string }> = async (req, res) => {
  const unitID = getUnitID(req)
  if (!unitID) {
    res.status(400).json({ error: 'unitID is required' })
    return
  }

  const { orderID } = req.params
  const updatedFields = req.body

  const ordersService = new Orders()

  try {
    const result = await ordersService.updateOrder(unitID, Number(orderID), updatedFields)
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Order not found or no changes made' })
      return
    }
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to update order', details: message })
  }
}

// DELETE - Delete order
export const deleteOrder: RequestHandler<{ orderID: string }> = async (req, res) => {
  const unitID = getUnitID(req)
  if (!unitID) {
    res.status(400).json({ error: 'unitID is required' })
    return
  }

  const { orderID } = req.params
  const ordersService = new Orders()

  try {
    const result = await ordersService.deleteOrder(unitID, Number(orderID))
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Order not found' })
      return
    }
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to delete order', details: message })
  }
}
