import db from '../utils/db'
import { ResultSetHeader } from 'mysql2'
import { PaymentRow, AddPaymentPayload } from '../interfaces/payments'

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
