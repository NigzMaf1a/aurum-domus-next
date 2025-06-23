import db from '../utils/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

interface ReservationRow extends RowDataPacket {
  ReservationID: number
  UnitID: string
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

interface AddReservationPayload {
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

export default class Reservation {
  private unitID: string

  constructor(unitID: string) {
    this.unitID = unitID
  }

  async addReservation(data: AddReservationPayload): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Reservation (
        UnitID, TableID, CustomerID, OrderID, DishID,
        DishName, Plates, OrderPrice, PaymentStatus,
        ReservationDate, ReservationTime
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const [result] = await db.execute<ResultSetHeader>(sql, [
      this.unitID,
      data.tableID,
      data.customerID,
      data.orderID,
      data.dishID,
      data.dishName,
      data.plates,
      data.orderPrice,
      data.paymentStatus,
      data.reservationDate,
      data.reservationTime
    ])
    return { message: 'Reservation added', id: result.insertId }
  }

  async getReservations(): Promise<ReservationRow[]> {
    const sql = `SELECT * FROM Reservation WHERE UnitID = ?`
    const [rows] = await db.execute<ReservationRow[]>(sql, [this.unitID])
    return rows
  }

  async updateReservation(
    reservationID: number,
    updatedFields: Partial<Omit<ReservationRow, 'ReservationID' | 'UnitID'>>
  ): Promise<{ message: string; affectedRows: number }> {
    const fields = Object.keys(updatedFields).map(key => `${key} = ?`)
    const values = Object.values(updatedFields)
    values.push(reservationID, this.unitID)

    const sql = `
      UPDATE Reservation
      SET ${fields.join(', ')}
      WHERE ReservationID = ? AND UnitID = ?
    `
    const [result] = await db.execute<ResultSetHeader>(sql, values)
    return { message: 'Reservation updated', affectedRows: result.affectedRows }
  }

  async deleteReservation(reservationID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Reservation WHERE ReservationID = ? AND UnitID = ?`
    const [result] = await db.execute<ResultSetHeader>(sql, [reservationID, this.unitID])
    return { message: 'Reservation deleted', affectedRows: result.affectedRows }
  }
}
