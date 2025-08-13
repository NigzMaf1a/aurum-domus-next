import { RowDataPacket } from "mysql2";

export interface PaymentRow extends RowDataPacket {
  PaymentID: number
  FinanceID: number
  CustomerID: number
  OrderID: number
  Name1: string
  Name2: string
  PaymentType: string
  PaymentAmount: number
  PaymentDate: string
  PaymentTime: string
}

export interface AddPaymentPayload {
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