import db from '../utils/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { ChefPayload, ChefRow } from '../interfaces/chef'

export default class Chef {
  constructor() {}

  async createChef(data: ChefPayload): Promise<{ message: string; id: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      const regSql = `
        INSERT INTO Registration
        (Name1, Name2, PhoneNo, Email, UserPassword, Gender, RegType, dLocation, accStatus, UserImage)
        VALUES (?, ?, ?, ?, ?, ?, 'Chef', ?, ?, ?)
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

      const chefSql = `
        INSERT INTO Chef (ChefID, UnitID, Name1, Name2, PhoneNo, Email, Gender)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `
      await connection.execute<ResultSetHeader>(chefSql, [
        newRegID,
        data.UnitID,
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Gender,
      ])

      await connection.commit()
      return { message: 'Chef created successfully', id: newRegID }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  async getAllChefs(): Promise<ChefRow[]> {
    const sql = `
      SELECT
        c.ChefID,
        c.UnitID,
        r.Name1,
        r.Name2,
        r.Email,
        r.PhoneNo,
        r.Gender,
        r.accStatus,
        r.RegType,
        r.UserImage,
        r.lastAccessed
      FROM Chef c
      INNER JOIN Registration r ON c.ChefID = r.RegID
      ORDER BY r.Name1 ASC
    `
    const [rows] = await db.execute<ChefRow[] & RowDataPacket[]>(sql)
    return rows
  }

  async getChefByID(id: number): Promise<ChefRow | undefined> {
    const sql = `
      SELECT
        c.ChefID,
        c.UnitID,
        r.Name1,
        r.Name2,
        r.Email,
        r.PhoneNo,
        r.Gender,
        r.accStatus,
        r.RegType,
        r.UserImage,
        r.lastAccessed
      FROM Chef c
      INNER JOIN Registration r ON c.ChefID = r.RegID
      WHERE c.ChefID = ?
    `
    const [rows] = await db.execute<ChefRow[] & RowDataPacket[]>(sql, [id])
    return rows[0]
  }

  async updateChef(id: number, data: ChefPayload): Promise<{ message: string; affectedRows: number }> {
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

      const chefSql = `
        UPDATE Chef
        SET UnitID = ?, Name1 = ?, Name2 = ?, PhoneNo = ?, Email = ?, Gender = ?
        WHERE ChefID = ?
      `
      await connection.execute<ResultSetHeader>(chefSql, [
        data.UnitID,
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Gender,
        id,
      ])

      await connection.commit()
      return { message: 'Chef updated successfully', affectedRows: regResult.affectedRows }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  async deleteChef(id: number): Promise<{ message: string; affectedRows: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      await connection.execute<ResultSetHeader>('DELETE FROM Chef WHERE ChefID = ?', [id])

      const [regResult] = await connection.execute<ResultSetHeader>(
        'DELETE FROM Registration WHERE RegID = ?',
        [id]
      )

      await connection.commit()
      return { message: 'Chef deleted successfully', affectedRows: regResult.affectedRows }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }
}
