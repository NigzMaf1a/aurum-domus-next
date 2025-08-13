import db from '../utils/db'
import { ResultSetHeader} from 'mysql2'
import {UnitRow, UnitPayload} from '../interfaces/unit'

export default class Unit {
  constructor() {}

  async addUnit(data: UnitPayload): Promise<{ message: string; unitID: number }> {
    const sql = `
      INSERT INTO Unit (UnitName, UnitEmail, UnitPhone, UnitLocation, UnitBalance, Employees)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.unitName,
      data.unitEmail,
      data.unitPhone,
      data.unitLocation,
      data.unitBalance,
      data.employees ?? 0,
    ])
    return { message: 'Unit added', unitID: result.insertId }
  }

  async getUnits(): Promise<UnitRow[]> {
    const sql = `SELECT * FROM Unit ORDER BY UnitID`
    const [rows] = await db.execute<UnitRow[]>(sql)
    return rows
  }

  async updateUnit(
    unitID: number,
    data: UnitPayload
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Unit
      SET UnitName = ?, UnitEmail = ?, UnitPhone = ?, UnitLocation = ?, UnitBalance = ?, Employees = ?
      WHERE UnitID = ?
    `
    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.unitName,
      data.unitEmail,
      data.unitPhone,
      data.unitLocation,
      data.unitBalance,
      data.employees ?? 0,
      unitID,
    ])
    return { message: 'Unit updated', affectedRows: result.affectedRows }
  }

  async deleteUnit(unitID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Unit WHERE UnitID = ?`
    const [result] = await db.execute<ResultSetHeader>(sql, [unitID])
    return { message: 'Unit deleted', affectedRows: result.affectedRows }
  }
}
