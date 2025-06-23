import db from '../utils/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

interface FinanceRow extends RowDataPacket {
  ID: number
  UnitID: string
  Amount: number
  Total: number
  Balance: number
  TransactionType: string
  TransactionDate: string // or Date if your DB returns it as JS Date
}

interface FinanceUpdatePayload {
  Amount?: number
  Total?: number
  Balance?: number
  TransactionType?: string
  TransactionDate?: string
}

export default class Finances {
  constructor() {}

  async addToFinances(
    unitID: string,
    amount: number,
    total: number,
    balance: number,
    transactionType: string,
    transactionDate: string
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Finances (UnitID, Amount, Total, Balance, TransactionType, TransactionDate)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    const [result] = await db.execute<ResultSetHeader>(sql, [
      unitID,
      amount,
      total,
      balance,
      transactionType,
      transactionDate
    ])
    return { message: 'Finance record added', id: result.insertId }
  }

  async getFinances(unitID: string): Promise<FinanceRow[]> {
    const sql = `SELECT * FROM Finances WHERE UnitID = ?`
    const [rows] = await db.execute<FinanceRow[]>(sql, [unitID])
    return rows
  }

  async updateFinance(id: number, updates: FinanceUpdatePayload): Promise<{ message: string; affectedRows: number }> {
    const sql = `UPDATE Finances SET ? WHERE ID = ?`
    const [result] = await db.execute<ResultSetHeader>(sql, [updates, id])
    return { message: 'Finance record updated', affectedRows: result.affectedRows }
  }

  async deleteFromFinance(id: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Finances WHERE ID = ?`
    const [result] = await db.execute<ResultSetHeader>(sql, [id])
    return { message: 'Finance record deleted', affectedRows: result.affectedRows }
  }
}
