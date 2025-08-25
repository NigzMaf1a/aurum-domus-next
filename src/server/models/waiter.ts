import db from '../utils/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { WaiterPayload, WaiterRow } from '../interfaces/waiter'

export default class Waiter {
  constructor() {}

  async createWaiter(data: WaiterPayload): Promise<{ message: string; id: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      const regSql = `
        INSERT INTO Registration 
        (Name1, Name2, PhoneNo, Email, UserPassword, Gender, RegType, dLocation, accStatus, UserImage)
        VALUES (?, ?, ?, ?, ?, ?, 'Waiter', ?, ?, ?)
      `
      const [regResult] = await connection.execute<ResultSetHeader>(regSql, [
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Password,
        data.Gender,
        data.dLocation ?? null,
        data.accStatus ?? 'Pending',
        data.UserImage ?? null,
      ])

      const newRegID = regResult.insertId

      const waiterSql = `
        INSERT INTO Waiter (WaiterID, UnitID, Name1, Name2, PhoneNo, Email, Gender)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `
      await connection.execute<ResultSetHeader>(waiterSql, [
        newRegID,
        data.UnitID,
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Gender,
      ])

      await connection.commit()
      return { message: 'Waiter created successfully', id: newRegID }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  async getAllWaiters(): Promise<WaiterRow[]> {
    const sql = `
      SELECT 
        w.WaiterID,
        w.UnitID,
        r.Name1,
        r.Name2,
        r.Email,
        r.PhoneNo,
        r.accStatus,
        r.RegType,
        r.UserImage,
        r.lastAccessed
      FROM Waiter w
      INNER JOIN Registration r ON w.WaiterID = r.RegID
      ORDER BY r.Name1 ASC
    `
    const [rows] = await db.execute<WaiterRow[] & RowDataPacket[]>(sql)
    return rows
  }

  async getWaiterByID(id: number): Promise<WaiterRow | undefined> {
    const sql = `
      SELECT 
        w.WaiterID,
        w.UnitID,
        r.Name1,
        r.Name2,
        r.Email,
        r.PhoneNo,
        r.accStatus,
        r.RegType,
        r.UserImage,
        r.lastAccessed
      FROM Waiter w
      INNER JOIN Registration r ON w.WaiterID = r.RegID
      WHERE w.WaiterID = ?
    `
    const [rows] = await db.execute<WaiterRow[] & RowDataPacket[]>(sql, [id])
    return rows[0]
  }

  async updateWaiter(id: number, data: WaiterPayload): Promise<{ message: string; affectedRows: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      const regSql = `
        UPDATE Registration
        SET Name1 = ?, Name2 = ?, PhoneNo = ?, Email = ?, UserPassword = ?, Gender = ?,
            dLocation = ?, accStatus = ?, UserImage = ?
        WHERE RegID = ?
      `
      const [regResult] = await connection.execute<ResultSetHeader>(regSql, [
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Password,
        data.Gender,
        data.dLocation ?? null,
        data.accStatus ?? 'Pending',
        data.UserImage ?? null,
        id,
      ])

      const waiterSql = `
        UPDATE Waiter
        SET UnitID = ?, Name1 = ?, Name2 = ?, PhoneNo = ?, Email = ?, Gender = ?
        WHERE WaiterID = ?
      `
      await connection.execute<ResultSetHeader>(waiterSql, [
        data.UnitID,
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Gender,
        id,
      ])

      await connection.commit()
      return { message: 'Waiter updated successfully', affectedRows: regResult.affectedRows }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  async deleteWaiter(id: number): Promise<{ message: string; affectedRows: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      await connection.execute<ResultSetHeader>('DELETE FROM Waiter WHERE WaiterID = ?', [id])

      const [regResult] = await connection.execute<ResultSetHeader>(
        'DELETE FROM Registration WHERE RegID = ?',
        [id]
      )

      await connection.commit()
      return { message: 'Waiter deleted successfully', affectedRows: regResult.affectedRows }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }
}
