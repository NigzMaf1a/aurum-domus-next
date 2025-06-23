import db from '../utils/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

interface UserRow extends RowDataPacket {
  RegID: number
  Name1: string
  Name2: string
  PhoneNo: string
  Email: string
  Password: string
  Gender: string
  RegType: string
  dLocation: string
  accStatus: string
}

interface UserPayload {
  name1: string
  name2: string
  phone: string
  email: string
  password: string
  gender: string
  regtype: string
  location: string
  accstatus?: string
}

export default class User {
  constructor() {}

  async createUser(data: UserPayload): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Registration 
      (Name1, Name2, PhoneNo, Email, Password, Gender, RegType, dLocation, accStatus) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.name1,
      data.name2,
      data.phone,
      data.email,
      data.password,
      data.gender,
      data.regtype,
      data.location,
      data.accstatus ?? 'Pending',
    ])
    return { message: 'User created', id: result.insertId }
  }

  async readUsers(): Promise<UserRow[]> {
    const sql = `SELECT * FROM Registration`
    const [rows] = await db.execute<UserRow[]>(sql)
    return rows
  }

  async updateUser(
    regID: number,
    data: UserPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Registration 
      SET Name1 = ?, Name2 = ?, PhoneNo = ?, Email = ?, Password = ?, Gender = ?, RegType = ?, dLocation = ?, accStatus = ?
      WHERE RegID = ?
    `
    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.name1,
      data.name2,
      data.phone,
      data.email,
      data.password,
      data.gender,
      data.regtype,
      data.location,
      data.accstatus ?? 'Pending',
      regID,
    ])
    return { message: 'User updated', affectedRows: result.affectedRows }
  }

  async deleteUser(regID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Registration WHERE RegID = ?`
    const [result] = await db.execute<ResultSetHeader>(sql, [regID])
    return { message: 'User deleted', affectedRows: result.affectedRows }
  }

  async getUserData(email: string): Promise<UserRow | undefined> {
    const sql = `SELECT * FROM Registration WHERE Email = ?`
    const [rows] = await db.execute<UserRow[]>(sql, [email])
    return rows[0] // user or undefined
  }
}
