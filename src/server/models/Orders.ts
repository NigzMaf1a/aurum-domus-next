import db from '../utils/db';
import { ResultSetHeader } from 'mysql2';
import { OrderRow, AddOrderPayload } from '../interfaces/orders';

export default class Orders {

  /**
   * Add a new order
   */
  async addOrder(
    unitID: number,
    data: AddOrderPayload
  ): Promise<{ message: string; id: number; affectedRows: number }> {
    try {
      const sql = `
        INSERT INTO Orders (
          UnitID, CustomerID, DishID, DishName,
          DishPrice, Plates, OrderPrice, OrderDate,
          OrderTime, PaymentStatus, Served
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const [result] = await db.execute<ResultSetHeader>(sql, [
        unitID,
        data.customerID,
        data.dishID,
        data.dishName,
        data.dishPrice,
        data.plates,
        data.orderPrice,
        data.orderDate,
        data.orderTime,
        data.paymentStatus,
        data.served
      ]);

      return {
        message: 'Order added',
        id: result.insertId,
        affectedRows: result.affectedRows
      };
    } catch (err) {
      console.error('DB Error (addOrder):', err);
      throw new Error('Failed to add order');
    }
  }

  /**
   * Get all orders for a unit
   */
  async getOrders(unitID: number): Promise<OrderRow[]> {
    try {
      const sql = `
        SELECT
          OrderID, UnitID, CustomerID, DishID, DishName,
          DishPrice, Plates, OrderPrice, OrderDate,
          OrderTime, PaymentStatus, Served
        FROM Orders
        WHERE UnitID = ?
      `;
      const [rows] = await db.execute<OrderRow[]>(sql, [unitID]);
      return rows;
    } catch (err) {
      console.error('DB Error (getOrders):', err);
      throw new Error('Failed to retrieve orders');
    }
  }

  /**
   * Update an order with partial fields
   */
  async updateOrder(
    unitID: number,
    orderID: number,
    updatedFields: Partial<Omit<OrderRow, 'OrderID' | 'UnitID'>>
  ): Promise<{ message: string; affectedRows: number }> {
    if (!Object.keys(updatedFields).length) {
      return { message: 'No fields to update', affectedRows: 0 };
    }

    try {
      const fields = Object.keys(updatedFields).map(key => `${key} = ?`);
      const values = Object.values(updatedFields);
      values.push(orderID, unitID);

      const sql = `
        UPDATE Orders
        SET ${fields.join(', ')}
        WHERE OrderID = ? AND UnitID = ?
      `;
      const [result] = await db.execute<ResultSetHeader>(sql, values);

      return {
        message: 'Order updated',
        affectedRows: result.affectedRows
      };
    } catch (err) {
      console.error('DB Error (updateOrder):', err);
      throw new Error('Failed to update order');
    }
  }

  /**
   * Delete an order
   */
  async deleteOrder(
    unitID: number,
    orderID: number
  ): Promise<{ message: string; affectedRows: number }> {
    try {
      const sql = `
        DELETE FROM Orders
        WHERE OrderID = ? AND UnitID = ?
      `;
      const [result] = await db.execute<ResultSetHeader>(sql, [orderID, unitID]);

      return {
        message: 'Order deleted',
        affectedRows: result.affectedRows
      };
    } catch (err) {
      console.error('DB Error (deleteOrder):', err);
      throw new Error('Failed to delete order');
    }
  }
}
