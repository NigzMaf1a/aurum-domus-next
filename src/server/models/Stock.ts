import db from '../utils/db'
import { ResultSetHeader} from 'mysql2'
import { StockRow, StockPayload } from '../interfaces/stock'

export default class Stock {
  constructor() {}

  async addStockItem(data: StockPayload): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Stock (UnitID, ItemName, Quantity, Price)
      VALUES (?, ?, ?, ?)
    `
    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.unitID,
      data.itemName,
      data.quantity,
      data.price,
    ])
    return { message: 'Stock item added', id: result.insertId }
  }

  async getStock(unitID: number): Promise<StockRow[]> {
    const sql = `SELECT * FROM Stock WHERE UnitID = ?`
    const [rows] = await db.execute<StockRow[]>(sql, [unitID])
    return rows
  }

  async updateStockItem(
    stockID: number,
    data: Pick<StockPayload, 'itemName' | 'quantity' | 'price'>
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Stock
      SET ItemName = ?, Quantity = ?, Price = ?
      WHERE StockID = ?
    `
    const [result] = await db.execute<ResultSetHeader>(sql, [
      data.itemName,
      data.quantity,
      data.price,
      stockID,
    ])
    return { message: 'Stock item updated', affectedRows: result.affectedRows }
  }

  async deleteStockItem(stockID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Stock WHERE StockID = ?`
    const [result] = await db.execute<ResultSetHeader>(sql, [stockID])
    return { message: 'Stock item deleted', affectedRows: result.affectedRows }
  }
}
