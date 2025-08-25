// models/supplier.ts
import db from '../utils/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { SupplierPayload, SupplierRow } from '../interfaces/supplier'

export default class Supplier {
  constructor() {}

  async createSupplier(data: SupplierPayload): Promise<{ message: string; id: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      const regSql = `
        INSERT INTO Registration 
        (Name1, Name2, PhoneNo, Email, UserPassword, Gender, RegType, dLocation, accStatus, UserImage)
        VALUES (?, ?, ?, ?, ?, ?, 'Supplier', ?, ?, ?)
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

      const supplierSql = `
        INSERT INTO Supplier (SupplierID, Name1, Name2, PhoneNo, Email, Gender)
        VALUES (?, ?, ?, ?, ?, ?)
      `
      await connection.execute<ResultSetHeader>(supplierSql, [
        newRegID,
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Gender,
      ])

      await connection.commit()
      return { message: 'Supplier created successfully', id: newRegID }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  async getAllSuppliers(): Promise<SupplierRow[]> {
    const sql = `
      SELECT s.SupplierID, r.Name1, r.Name2, r.Email, r.PhoneNo, r.accStatus, r.RegType, r.UserImage, r.lastAccessed
      FROM Supplier s
      INNER JOIN Registration r ON s.SupplierID = r.RegID
      ORDER BY r.Name1 ASC
    `
    const [rows] = await db.execute<SupplierRow[] & RowDataPacket[]>(sql)
    return rows
  }

  async getSupplierByID(id: number): Promise<SupplierRow | undefined> {
    const sql = `
      SELECT s.SupplierID, r.Name1, r.Name2, r.Email, r.PhoneNo, r.accStatus, r.RegType, r.UserImage, r.lastAccessed
      FROM Supplier s
      INNER JOIN Registration r ON s.SupplierID = r.RegID
      WHERE s.SupplierID = ?
    `
    const [rows] = await db.execute<SupplierRow[] & RowDataPacket[]>(sql, [id])
    return rows[0]
  }

  async updateSupplier(id: number, data: SupplierPayload): Promise<{ message: string; affectedRows: number }> {
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

      const supplierSql = `
        UPDATE Supplier
        SET Name1 = ?, Name2 = ?, PhoneNo = ?, Email = ?, Gender = ?
        WHERE SupplierID = ?
      `
      await connection.execute<ResultSetHeader>(supplierSql, [
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Gender,
        id,
      ])

      await connection.commit()
      return { message: 'Supplier updated successfully', affectedRows: regResult.affectedRows }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  async deleteSupplier(id: number): Promise<{ message: string; affectedRows: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      await connection.execute<ResultSetHeader>('DELETE FROM Supplier WHERE SupplierID = ?', [id])

      const [regResult] = await connection.execute<ResultSetHeader>(
        'DELETE FROM Registration WHERE RegID = ?',
        [id]
      )

      await connection.commit()
      return { message: 'Supplier deleted successfully', affectedRows: regResult.affectedRows }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }
}
