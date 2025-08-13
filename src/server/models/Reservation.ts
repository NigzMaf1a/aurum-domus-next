import db from '../utils/db'
import { ResultSetHeader} from 'mysql2'
import { ReservationRow, AddReservationPayload } from '../interfaces/reservation'

export default class Reservation {

  async addReservation(unitID: number, data: AddReservationPayload): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Reservation (
        UnitID, TableID, CustomerID, OrderID, DishID,
        DishName, Plates, OrderPrice, PaymentStatus,
        ReservationDate, ReservationTime
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const [result] = await db.execute<ResultSetHeader>(sql, [
      unitID,
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

  async getReservations(unitID: number): Promise<ReservationRow[]> {
    const sql = `SELECT * FROM Reservation WHERE UnitID = ?`
    const [rows] = await db.execute<ReservationRow[]>(sql, [unitID])
    return rows
  }

  async updateReservation(
    unitID: number,
    reservationID: number,
    updatedFields: Partial<Omit<ReservationRow, 'ReservationID' | 'UnitID'>>
  ): Promise<{ message: string; affectedRows: number }> {
    const fields = Object.keys(updatedFields).map(key => `${key} = ?`)
    const values = Object.values(updatedFields)
    values.push(reservationID, unitID)

    const sql = `
      UPDATE Reservation
      SET ${fields.join(', ')}
      WHERE ReservationID = ? AND UnitID = ?
    `
    const [result] = await db.execute<ResultSetHeader>(sql, values)
    return { message: 'Reservation updated', affectedRows: result.affectedRows }
  }

  async deleteReservation(unitID: number, reservationID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Reservation WHERE ReservationID = ? AND UnitID = ?`
    const [result] = await db.execute<ResultSetHeader>(sql, [reservationID, unitID])
    return { message: 'Reservation deleted', affectedRows: result.affectedRows }
  }
}
