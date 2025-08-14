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
    data: Partial<Omit<StockPayload, 'StockID'>>
  ): Promise<{ message: string; affectedRows: number }> {
    // Build dynamic SET clause
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) {
      return { message: 'No fields to update', affectedRows: 0 };
    }

    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const sql = `UPDATE Stock SET ${setClause} WHERE StockID = ?`;

    values.push(stockID);
    const [result] = await db.execute<ResultSetHeader>(sql, values);

    return { message: 'Stock item updated', affectedRows: result.affectedRows };
  }

  async deleteStockItem(stockID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Stock WHERE StockID = ?`
    const [result] = await db.execute<ResultSetHeader>(sql, [stockID])
    return { message: 'Stock item deleted', affectedRows: result.affectedRows }
  }
}
