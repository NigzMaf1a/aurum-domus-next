import db from '../utils/db'
import { ResultSetHeader} from 'mysql2'
import {UserRow, UserPayload} from '../interfaces/user'

export default class User {
  constructor() {}

  async createUser(data: UserPayload): Promise<{ message: string; id: number }> {
const sql = `
  INSERT INTO Registration 
  (Name1, Name2, PhoneNo, Email, Password, Gender, RegType, dLocation, accStatus, image) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`

const [result] = await db.execute<ResultSetHeader>(sql, [
  data.Name1,
  data.Name2,
  data.Phone,
  data.Email,
  data.UserPassword,
  data.Gender,
  data.RegType,
  data.dLocation ?? null,
  data.accStatus ?? 'Pending',
  data.Image ?? null,
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
      SET Name1 = ?, Name2 = ?, PhoneNo = ?, Email = ?, Password = ?, Gender = ?, RegType = ?, accStatus = ?
      WHERE RegID = ?
    `
    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.Name1,
      data.Name2,
      data.Phone,
      data.Email,
      data.UserPassword,
      data.Gender,
      data.RegType,
      data.accStatus ?? 'Pending',
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
