import db from '../utils/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

interface SalaryRow extends RowDataPacket {
  SalaryID: number
  FinanceID: number
  RegID: number
  SalaryAmount: number
  SalaryPaid: number
  SalaryReceived: number
  SalaryDate: string
  SalaryTime: string
}

interface SalaryPayload {
  financeID: number
  regID: number
  salaryAmount: number
  salaryPaid: number
  salaryReceived: number
  salaryDate: string
  salaryTime: string
}

export default class Salary {
  constructor() {}

  async addSalary(data: SalaryPayload): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Salary (
        FinanceID, RegID, SalaryAmount,
        SalaryPaid, SalaryReceived,
        SalaryDate, SalaryTime
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `
    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.financeID,
      data.regID,
      data.salaryAmount,
      data.salaryPaid,
      data.salaryReceived,
      data.salaryDate,
      data.salaryTime,
    ])
    return { message: 'Salary added', id: result.insertId }
  }

  async getSalaries(): Promise<SalaryRow[]> {
    const sql = `
      SELECT 
        SalaryID, FinanceID, RegID,
        SalaryAmount, SalaryPaid, SalaryReceived,
        SalaryDate, SalaryTime
      FROM Salary
    `
    const [rows] = await db.execute<SalaryRow[]>(sql)
    return rows
  }

  async updateSalary(salaryID: number, data: SalaryPayload): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Salary SET 
        FinanceID = ?, 
        RegID = ?, 
        SalaryAmount = ?, 
        SalaryPaid = ?, 
        SalaryReceived = ?, 
        SalaryDate = ?, 
        SalaryTime = ?
      WHERE SalaryID = ?
    `
    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.financeID,
      data.regID,
      data.salaryAmount,
      data.salaryPaid,
      data.salaryReceived,
      data.salaryDate,
      data.salaryTime,
      salaryID,
    ])
    return { message: 'Salary updated', affectedRows: result.affectedRows }
  }

  async deleteSalary(salaryID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Salary WHERE SalaryID = ?`
    const [result] = await db.execute<ResultSetHeader>(sql, [salaryID])
    return { message: 'Salary deleted', affectedRows: result.affectedRows }
  }
}
