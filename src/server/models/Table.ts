import db from '../utils/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

interface TableRow extends RowDataPacket {
  TableID: number
  UnitID: string
  TableName: string
  TableStatus: string
}

export default class Table {
  private unitID: string

  constructor(unitID: string) {
    this.unitID = unitID
  }

  async addTable(tableName: string, status: string = 'Vacant'): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Tables (UnitID, TableName, TableStatus)
      VALUES (?, ?, ?)
    `
    const [result] = await db.execute<ResultSetHeader>(sql, [this.unitID, tableName, status])
    return { message: 'Table added', id: result.insertId }
  }

  async getAllTables(): Promise<TableRow[]> {
    const [rows] = await db.execute<TableRow[]>(
      'SELECT * FROM Tables WHERE UnitID = ?',
      [this.unitID]
    )
    return rows
  }

  async getVacantTables(): Promise<TableRow[]> {
    const [rows] = await db.execute<TableRow[]>(
      'SELECT * FROM Tables WHERE UnitID = ? AND TableStatus = "Vacant"',
      [this.unitID]
    )
    return rows
  }

  async getOccupiedTables(): Promise<TableRow[]> {
    const [rows] = await db.execute<TableRow[]>(
      'SELECT * FROM Tables WHERE UnitID = ? AND TableStatus = "Occupied"',
      [this.unitID]
    )
    return rows
  }

  async updateTable(tableID: number, tableName: string, status: string): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Tables 
      SET TableName = ?, TableStatus = ?
      WHERE TableID = ? AND UnitID = ?
    `
    const [result] = await db.execute<ResultSetHeader>(
      sql, [tableName, status, tableID, this.unitID]
    )
    return { message: 'Table updated', affectedRows: result.affectedRows }
  }

  async deleteTable(tableID: number): Promise<{ message: string; affectedRows: number }> {
    const [result] = await db.execute<ResultSetHeader>(
      'DELETE FROM Tables WHERE TableID = ? AND UnitID = ?',
      [tableID, this.unitID]
    )
    return { message: 'Table deleted', affectedRows: result.affectedRows }
  }
}
