// models/owner.ts

import db from '../utils/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { OwnerPayload, OwnerRow } from '../interfaces/owner'

export default class Owner {
  constructor() {}

  async createOwner(data: OwnerPayload): Promise<{ message: string; id: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      const regSql = `
        INSERT INTO Registration
        (Name1, Name2, PhoneNo, Email, UserPassword, Gender, RegType, dLocation, accStatus, UserImage)
        VALUES (?, ?, ?, ?, ?, ?, 'Owner', ?, ?, ?)
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

      const ownerSql = `
        INSERT INTO HotelOwner (OwnerID, Name1, Name2, PhoneNo, Email, Gender)
        VALUES (?, ?, ?, ?, ?, ?)
      `
      await connection.execute<ResultSetHeader>(ownerSql, [
        newRegID,
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Gender,
      ])

      await connection.commit()
      return { message: 'Owner created successfully', id: newRegID }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  async getAllOwners(): Promise<OwnerRow[]> {
    const sql = `
      SELECT ho.OwnerID, r.Name1, r.Name2, r.Email, r.PhoneNo, r.accStatus, r.RegType, r.UserImage, r.lastAccessed
      FROM HotelOwner ho
      INNER JOIN Registration r ON ho.OwnerID = r.RegID
      ORDER BY r.Name1 ASC
    `
    const [rows] = await db.execute<OwnerRow[] & RowDataPacket[]>(sql)
    return rows
  }

  async getOwnerByID(id: number): Promise<OwnerRow | undefined> {
    const sql = `
      SELECT ho.OwnerID, r.Name1, r.Name2, r.Email, r.PhoneNo, r.accStatus, r.RegType, r.UserImage, r.lastAccessed
      FROM HotelOwner ho
      INNER JOIN Registration r ON ho.OwnerID = r.RegID
      WHERE ho.OwnerID = ?
    `
    const [rows] = await db.execute<OwnerRow[] & RowDataPacket[]>(sql, [id])
    return rows[0]
  }

  async updateOwner(id: number, data: OwnerPayload): Promise<{ message: string; affectedRows: number }> {
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

      const ownerSql = `
        UPDATE HotelOwner
        SET Name1 = ?, Name2 = ?, PhoneNo = ?, Email = ?, Gender = ?
        WHERE OwnerID = ?
      `
      await connection.execute<ResultSetHeader>(ownerSql, [
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Gender,
        id,
      ])

      await connection.commit()
      return { message: 'Owner updated successfully', affectedRows: regResult.affectedRows }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  async deleteOwner(id: number): Promise<{ message: string; affectedRows: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      await connection.execute<ResultSetHeader>('DELETE FROM HotelOwner WHERE OwnerID = ?', [id])

      const [regResult] = await connection.execute<ResultSetHeader>(
        'DELETE FROM Registration WHERE RegID = ?',
        [id]
      )

      await connection.commit()
      return { message: 'Owner deleted successfully', affectedRows: regResult.affectedRows }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }
}
