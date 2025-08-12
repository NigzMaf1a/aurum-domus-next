import { Request, Response } from 'express'
import Payment from '../models/Payment'

interface AddPaymentPayload {
  financeID: number
  customerID: number
  orderID: number
  name1: string
  name2: string
  paymentType: string
  paymentAmount: number
  paymentDate: string // or Date if you parse it
  paymentTime: string // or Date if you parse it
}

// CREATE - Add a payment
export const addPayment = async (req: Request, res: Response) => {
  const {
    financeID,
    customerID,
    orderID,
    name1,
    name2,
    paymentType,
    paymentAmount,
    paymentDate,
    paymentTime,
  } = req.body as AddPaymentPayload

  const paymentService = new Payment()

  try {
    const result = await paymentService.addPayment({
      financeID,
      customerID,
      orderID,
      name1,
      name2,
      paymentType,
      paymentAmount,
      paymentDate,
      paymentTime,
    })
    res.status(201).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to add payment', details: message })
  }
}

// READ - Get all payments
export const getPayments = async (_req: Request, res: Response) => {
  const paymentService = new Payment()

  try {
    const result = await paymentService.getPayments()
    res.status(200).json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: 'Failed to fetch payments', details: message })
  }
}
