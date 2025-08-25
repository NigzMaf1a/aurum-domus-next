import db from '../utils/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { AdminPayload, AdminRow } from '../interfaces/admin'

export default class Admin {
  constructor() {}

  async createAdmin(data: AdminPayload): Promise<{ message: string; id: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      const regSql = `
        INSERT INTO Registration
        (Name1, Name2, PhoneNo, Email, UserPassword, Gender, RegType, dLocation, accStatus, UserImage)
        VALUES (?, ?, ?, ?, ?, ?, 'Admin', ?, ?, ?)
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

      const adminSql = `
        INSERT INTO AdminUser (AdminUserID, Name1, Name2, PhoneNo, Email, Gender)
        VALUES (?, ?, ?, ?, ?, ?)
      `
      await connection.execute<ResultSetHeader>(adminSql, [
        newRegID,
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Gender,
      ])

      await connection.commit()
      return { message: 'Admin created successfully', id: newRegID }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  async getAllAdmins(): Promise<AdminRow[]> {
    const sql = `
      SELECT a.AdminUserID, r.Name1, r.Name2, r.Email, r.PhoneNo, r.accStatus, r.RegType, r.UserImage, r.lastAccessed
      FROM AdminUser a
      INNER JOIN Registration r ON a.AdminUserID = r.RegID
      ORDER BY r.Name1 ASC
    `
    const [rows] = await db.execute<AdminRow[] & RowDataPacket[]>(sql)
    return rows
  }

  async getAdminByID(id: number): Promise<AdminRow | undefined> {
    const sql = `
      SELECT a.AdminUserID, r.Name1, r.Name2, r.Email, r.PhoneNo, r.accStatus, r.RegType, r.UserImage, r.lastAccessed
      FROM AdminUser a
      INNER JOIN Registration r ON a.AdminUserID = r.RegID
      WHERE a.AdminUserID = ?
    `
    const [rows] = await db.execute<AdminRow[] & RowDataPacket[]>(sql, [id])
    return rows[0]
  }

  async updateAdmin(id: number, data: AdminPayload): Promise<{ message: string; affectedRows: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      const regSql = `
        UPDATE Registration
        SET Name1 = ?, Name2 = ?, PhoneNo = ?, Email = ?, UserPassword = ?, Gender = ?, dLocation = ?, accStatus = ?, UserImage = ?
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

      const adminSql = `
        UPDATE AdminUser
        SET Name1 = ?, Name2 = ?, PhoneNo = ?, Email = ?, Gender = ?
        WHERE AdminUserID = ?
      `
      await connection.execute<ResultSetHeader>(adminSql, [
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Gender,
        id,
      ])

      await connection.commit()
      return { message: 'Admin updated successfully', affectedRows: regResult.affectedRows }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  async deleteAdmin(id: number): Promise<{ message: string; affectedRows: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      await connection.execute<ResultSetHeader>('DELETE FROM AdminUser WHERE AdminUserID = ?', [id])

      const [regResult] = await connection.execute<ResultSetHeader>(
        'DELETE FROM Registration WHERE RegID = ?',
        [id]
      )

      await connection.commit()
      return { message: 'Admin deleted successfully', affectedRows: regResult.affectedRows }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }
}
