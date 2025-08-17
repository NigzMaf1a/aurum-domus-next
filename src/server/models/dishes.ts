import db from '../utils/db';
import { ResultSetHeader } from 'mysql2';
import { DishRow, AddDishPayload } from '../interfaces/dishes';

export default class Dish {
  async addDish(unitID: number, data: AddDishPayload): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Dishes (UnitID, DishName, DishDescription, DishPrice, Available)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute<ResultSetHeader>(sql, [
      unitID,
      data.dishName,
      data.dishDescription || null,
      data.dishPrice,
      data.available
    ]);
    return { message: 'Dish added', id: result.insertId };
  }

  async getDishes(unitID: number): Promise<DishRow[]> {
    const sql = `SELECT * FROM Dishes WHERE UnitID = ?`;
    const [rows] = await db.execute<DishRow[]>(sql, [unitID]);
    return rows;
  }

  async updateDish(
    unitID: number,
    dishID: number,
    updatedFields: Partial<Omit<DishRow, 'DishID' | 'UnitID'>>
  ): Promise<{ message: string; affectedRows: number }> {
    const fields = Object.keys(updatedFields).map(key => `${key} = ?`);
    const values = Object.values(updatedFields);
    values.push(dishID, unitID);

    const sql = `
      UPDATE Dishes
      SET ${fields.join(', ')}
      WHERE DishID = ? AND UnitID = ?
    `;
    const [result] = await db.execute<ResultSetHeader>(sql, values);
    return { message: 'Dish updated', affectedRows: result.affectedRows };
  }

  async deleteDish(unitID: number, dishID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Dishes WHERE DishID = ? AND UnitID = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [dishID, unitID]);
    return { message: 'Dish deleted', affectedRows: result.affectedRows };
  }
}
