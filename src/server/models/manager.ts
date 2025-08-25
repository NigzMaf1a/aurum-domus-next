import db from '../utils/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { ManagerPayload, ManagerRow } from '../interfaces/manager'

export default class Manager {
  constructor() {}

  async createManager(data: ManagerPayload): Promise<{ message: string; id: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      const regSql = `
        INSERT INTO Registration
        (Name1, Name2, PhoneNo, Email, UserPassword, Gender, RegType, dLocation, accStatus, UserImage)
        VALUES (?, ?, ?, ?, ?, ?, 'Manager', ?, ?, ?)
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

      const managerSql = `
        INSERT INTO Manager (ManagerID, UnitID, Name1, Name2, PhoneNo, Email, Gender)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `
      await connection.execute<ResultSetHeader>(managerSql, [
        newRegID,
        data.UnitID,
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Gender,
      ])

      await connection.commit()
      return { message: 'Manager created successfully', id: newRegID }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  async getAllManagers(): Promise<ManagerRow[]> {
    const sql = `
      SELECT m.ManagerID, m.UnitID, r.Name1, r.Name2, r.PhoneNo, r.Email, r.Gender, 
             r.dLocation, r.accStatus, r.UserImage, r.lastAccessed
      FROM Manager m
      INNER JOIN Registration r ON m.ManagerID = r.RegID
      ORDER BY r.Name1 ASC
    `
    const [rows] = await db.execute<ManagerRow[] & RowDataPacket[]>(sql)
    return rows
  }

  async getManagerByID(id: number): Promise<ManagerRow | undefined> {
    const sql = `
      SELECT m.ManagerID, m.UnitID, r.Name1, r.Name2, r.PhoneNo, r.Email, r.Gender, 
             r.dLocation, r.accStatus, r.UserImage, r.lastAccessed
      FROM Manager m
      INNER JOIN Registration r ON m.ManagerID = r.RegID
      WHERE m.ManagerID = ?
    `
    const [rows] = await db.execute<ManagerRow[] & RowDataPacket[]>(sql, [id])
    return rows[0]
  }

  async updateManager(id: number, data: ManagerPayload): Promise<{ message: string; affectedRows: number }> {
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

      const managerSql = `
        UPDATE Manager
        SET UnitID = ?, Name1 = ?, Name2 = ?, PhoneNo = ?, Email = ?, Gender = ?
        WHERE ManagerID = ?
      `
      await connection.execute<ResultSetHeader>(managerSql, [
        data.UnitID,
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Gender,
        id,
      ])

      await connection.commit()
      return { message: 'Manager updated successfully', affectedRows: regResult.affectedRows }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  async deleteManager(id: number): Promise<{ message: string; affectedRows: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      await connection.execute<ResultSetHeader>('DELETE FROM Manager WHERE ManagerID = ?', [id])

      const [regResult] = await connection.execute<ResultSetHeader>(
        'DELETE FROM Registration WHERE RegID = ?',
        [id]
      )

      await connection.commit()
      return { message: 'Manager deleted successfully', affectedRows: regResult.affectedRows }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }
}
