import db from '../utils/db';
import { ResultSetHeader } from 'mysql2';
import { ReservationRow, AddReservationPayload } from '../interfaces/reservation';

export default class Reservation {
  
  /**
   * Add a new reservation
   */
  async addReservation(
    unitID: number,
    data: AddReservationPayload
  ): Promise<{ message: string; id: number; affectedRows: number }> {
    try {
      const sql = `
        INSERT INTO Reservation (
          UnitID, TableID, CustomerID, OrderID, DishID,
          DishName, Plates, OrderPrice, PaymentStatus,
          ReservationDate, ReservationTime
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
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
      ]);

      return {
        message: 'Reservation added',
        id: result.insertId,
        affectedRows: result.affectedRows
      };
    } catch (err) {
      console.error('DB Error (addReservation):', err);
      throw new Error('Failed to add reservation');
    }
  }

  /**
   * Get all reservations for a unit
   */
  async getReservations(unitID: number): Promise<ReservationRow[]> {
    try {
      const sql = `
        SELECT 
          ReservationID, UnitID, TableID, CustomerID, OrderID, DishID,
          DishName, Plates, OrderPrice, PaymentStatus,
          ReservationDate, ReservationTime
        FROM Reservation
        WHERE UnitID = ?
      `;
      const [rows] = await db.execute<ReservationRow[]>(sql, [unitID]);
      return rows;
    } catch (err) {
      console.error('DB Error (getReservations):', err);
      throw new Error('Failed to retrieve reservations');
    }
  }

  /**
   * Update a reservation with partial fields
   */
  async updateReservation(
    unitID: number,
    reservationID: number,
    updatedFields: Partial<Omit<ReservationRow, 'ReservationID' | 'UnitID'>>
  ): Promise<{ message: string; affectedRows: number }> {
    if (!Object.keys(updatedFields).length) {
      return { message: 'No fields to update', affectedRows: 0 };
    }

    try {
      const fields = Object.keys(updatedFields).map(key => `${key} = ?`);
      const values = Object.values(updatedFields);
      values.push(reservationID, unitID);

      const sql = `
        UPDATE Reservation
        SET ${fields.join(', ')}
        WHERE ReservationID = ? AND UnitID = ?
      `;
      const [result] = await db.execute<ResultSetHeader>(sql, values);

      return {
        message: 'Reservation updated',
        affectedRows: result.affectedRows
      };
    } catch (err) {
      console.error('DB Error (updateReservation):', err);
      throw new Error('Failed to update reservation');
    }
  }

  /**
   * Delete a reservation
   */
  async deleteReservation(
    unitID: number,
    reservationID: number
  ): Promise<{ message: string; affectedRows: number }> {
    try {
      const sql = `
        DELETE FROM Reservation
        WHERE ReservationID = ? AND UnitID = ?
      `;
      const [result] = await db.execute<ResultSetHeader>(sql, [reservationID, unitID]);

      return {
        message: 'Reservation deleted',
        affectedRows: result.affectedRows
      };
    } catch (err) {
      console.error('DB Error (deleteReservation):', err);
      throw new Error('Failed to delete reservation');
    }
  }
}
