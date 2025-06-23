import db from '../utils/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

interface PaymentRow extends RowDataPacket {
  PaymentID: number
  FinanceID: number
  CustomerID: number
  OrderID: number
  Name1: string
  Name2: string
  PaymentType: string
  PaymentAmount: number
  PaymentDate: string // or Date if your DB returns date object
  PaymentTime: string
}

interface AddPaymentPayload {
  financeID: number
  customerID: number
  orderID: number
  name1: string
  name2: string
  paymentType: string
  paymentAmount: number
  paymentDate: string
  paymentTime: string
}

export default class Payment {
  constructor() {}

  async addPayment(data: AddPaymentPayload): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Payment (
        FinanceID, CustomerID, OrderID,
        Name1, Name2, PaymentType,
        PaymentAmount, PaymentDate, PaymentTime
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.financeID,
      data.customerID,
      data.orderID,
      data.name1,
      data.name2,
      data.paymentType,
      data.paymentAmount,
      data.paymentDate,
      data.paymentTime
    ])
    return { message: 'Payment added', id: result.insertId }
  }

  async getPayments(): Promise<PaymentRow[]> {
    const sql = `
      SELECT 
        PaymentID, FinanceID, CustomerID, OrderID,
        Name1, Name2, PaymentType,
        PaymentAmount, PaymentDate, PaymentTime
      FROM Payment
    `
    const [rows] = await db.execute<PaymentRow[]>(sql)
    return rows
  }
}
