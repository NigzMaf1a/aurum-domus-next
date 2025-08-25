import db from '../utils/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { CustomerPayload, CustomerRow } from '../interfaces/customer'

export default class Customer {
  constructor() {}

  async createCustomer(data: CustomerPayload): Promise<{ message: string; id: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      const regSql = `
        INSERT INTO Registration 
        (Name1, Name2, PhoneNo, Email, UserPassword, Gender, RegType, dLocation, accStatus, UserImage)
        VALUES (?, ?, ?, ?, ?, ?, 'Customer', ?, ?, ?)
      `
      const [regResult] = await connection.execute<ResultSetHeader>(regSql, [
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.UserPassword,
        data.Gender,
        data.dLocation ?? null,
        data.accStatus ?? 'Pending',
        data.UserImage ?? null,
      ])

      const newRegID = regResult.insertId

      const customerSql = `
        INSERT INTO Customer (CustomerID, Name1, Name2, PhoneNo, Email, Gender)
        VALUES (?, ?, ?, ?, ?, ?)
      `
      await connection.execute<ResultSetHeader>(customerSql, [
        newRegID,
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Gender,
      ])

      await connection.commit()
      return { message: 'Customer created successfully', id: newRegID }
    } catch (error) {
      console.log(`DB insert error ${error}`)
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  async getAllCustomers(): Promise<CustomerRow[]> {
    const sql = `
      SELECT c.CustomerID, r.Name1, r.Name2, r.Email, r.PhoneNo, r.accStatus, r.RegType, r.UserImage, r.lastAccessed
      FROM Customer c
      INNER JOIN Registration r ON c.CustomerID = r.RegID
      ORDER BY r.Name1 ASC
    `
    const [rows] = await db.execute<CustomerRow[] & RowDataPacket[]>(sql)
    return rows
  }

  async getCustomerByID(id: number): Promise<CustomerRow | undefined> {
    const sql = `
      SELECT c.CustomerID, r.Name1, r.Name2, r.Email, r.PhoneNo, r.accStatus, r.RegType, r.UserImage, r.lastAccessed
      FROM Customer c
      INNER JOIN Registration r ON c.CustomerID = r.RegID
      WHERE c.CustomerID = ?
    `
    const [rows] = await db.execute<CustomerRow[] & RowDataPacket[]>(sql, [id])
    return rows[0]
  }

  async updateCustomer(id: number, data: CustomerPayload): Promise<{ message: string; affectedRows: number }> {
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
        data.UserPassword,
        data.Gender,
        data.dLocation ?? null,
        data.accStatus ?? 'Pending',
        data.UserImage ?? null,
        id,
      ])

      const customerSql = `
        UPDATE Customer
        SET Name1 = ?, Name2 = ?, PhoneNo = ?, Email = ?, Gender = ?
        WHERE CustomerID = ?
      `
      await connection.execute<ResultSetHeader>(customerSql, [
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Gender,
        id,
      ])

      await connection.commit()
      return { message: 'Customer updated successfully', affectedRows: regResult.affectedRows }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }

  async deleteCustomer(id: number): Promise<{ message: string; affectedRows: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      await connection.execute<ResultSetHeader>('DELETE FROM Customer WHERE CustomerID = ?', [id])

      const [regResult] = await connection.execute<ResultSetHeader>(
        'DELETE FROM Registration WHERE RegID = ?',
        [id]
      )

      await connection.commit()
      return { message: 'Customer deleted successfully', affectedRows: regResult.affectedRows }
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  }
}
