import { RowDataPacket } from "mysql2";

export interface ReservationRow extends RowDataPacket {
  ReservationID: number
  UnitID: number
  TableID: number
  CustomerID: number
  OrderID: number
  DishID: number
  DishName: string
  Plates: number
  OrderPrice: number
  PaymentStatus: string
  ReservationDate: string
  ReservationTime: string
}

export interface AddReservationPayload {
  tableID: number
  customerID: number
  orderID: number
  dishID: number
  dishName: string
  plates: number
  orderPrice: number
  paymentStatus: string
  reservationDate: string
  reservationTime: string
}