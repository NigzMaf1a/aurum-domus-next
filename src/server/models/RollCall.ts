import db from '../utils/db'
import { ResultSetHeader } from 'mysql2'
import { RollcallRow, AddRollCallPayload } from '../interfaces/rollcall'

export default class Rollcall {
  private unitID: string

  constructor(unitID: string) {
    this.unitID = unitID
  }

  async addRollCall(data: AddRollCallPayload): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO RollCall (
        RegID, UnitID, Name1, Name2, PhoneNo, Email, RollCallStatus, RollCallDate, RollCallTime
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.regID,
      this.unitID,
      data.name1,
      data.name2,
      data.phoneNo,
      data.email,
      data.status,
      data.date,
      data.time,
    ])
    return { message: 'Roll call logged', id: result.insertId }
  }

  async getRollCalls(): Promise<RollcallRow[]> {
    const sql = `SELECT * FROM RollCall WHERE UnitID = ?`
    const [rows] = await db.execute<RollcallRow[]>(sql, [this.unitID])
    return rows
  }

  async updateRollCall(
    rollCallID: number,
    updatedFields: Partial<Omit<RollcallRow, 'RollCallID' | 'UnitID'>>
  ): Promise<{ message: string; affectedRows: number }> {
    const fields = Object.keys(updatedFields).map(key => `${key} = ?`)
    const values = Object.values(updatedFields)
    values.push(rollCallID, this.unitID)

    const sql = `
      UPDATE RollCall
      SET ${fields.join(', ')}
      WHERE RollCallID = ? AND UnitID = ?
    `
    const [result] = await db.execute<ResultSetHeader>(sql, values)
    return { message: 'Roll call updated', affectedRows: result.affectedRows }
  }

  async deleteRollCall(rollCallID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM RollCall WHERE RollCallID = ? AND UnitID = ?`
    const [result] = await db.execute<ResultSetHeader>(sql, [rollCallID, this.unitID])
    return { message: 'Roll call deleted', affectedRows: result.affectedRows }
  }

  async getPresent(): Promise<RollcallRow[]> {
    const sql = `SELECT * FROM RollCall WHERE UnitID = ? AND RollCallStatus = 'PRESENT'`
    const [rows] = await db.execute<RollcallRow[]>(sql, [this.unitID])
    return rows
  }

  async getAbsent(): Promise<RollcallRow[]> {
    const sql = `SELECT * FROM RollCall WHERE UnitID = ? AND RollCallStatus = 'ABSENT'`
    const [rows] = await db.execute<RollcallRow[]>(sql, [this.unitID])
    return rows
  }
}
