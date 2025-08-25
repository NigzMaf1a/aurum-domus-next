// models/accountant.ts
import db from '../utils/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { AccountantPayload, AccountantRow } from '../interfaces/accountant';

export default class Accountant {
  constructor() {}

  async createAccountant(data: AccountantPayload): Promise<{ message: string; id: number }> {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const regSql = `
        INSERT INTO Registration
        (Name1, Name2, PhoneNo, Email, UserPassword, Gender, RegType, dLocation, accStatus, UserImage)
        VALUES (?, ?, ?, ?, ?, ?, 'Accountant', ?, ?, ?)
      `;
      const [regResult] = await connection.execute<ResultSetHeader>(regSql, [
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Password,
        data.Gender,
        data.dLocation ?? null,
        data.accStatus ?? 'Pending',
        data.UserImage ?? null,
      ]);

      const newRegID = regResult.insertId;

      const accountantSql = `
        INSERT INTO Accountant (AccountantID, UnitID, Name1, Name2, PhoneNo, Email, Gender)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      await connection.execute<ResultSetHeader>(accountantSql, [
        newRegID,
        data.UnitID,
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Gender,
      ]);

      await connection.commit();
      return { message: 'Accountant created successfully', id: newRegID };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async getAllAccountants(): Promise<AccountantRow[]> {
    const sql = `
      SELECT a.AccountantID, a.UnitID, r.Name1, r.Name2, r.Email, r.PhoneNo, r.accStatus, r.RegType, r.UserImage,
             r.lastAccessed, u.UnitName, a.Gender
      FROM Accountant a
      INNER JOIN Registration r ON a.AccountantID = r.RegID
      INNER JOIN Unit u ON a.UnitID = u.UnitID
      ORDER BY r.Name1 ASC
    `;
    const [rows] = await db.execute<AccountantRow[] & RowDataPacket[]>(sql);
    return rows;
  }

  async getAccountantByID(id: number): Promise<AccountantRow | undefined> {
    const sql = `
      SELECT a.AccountantID, a.UnitID, r.Name1, r.Name2, r.Email, r.PhoneNo, r.accStatus, r.RegType, r.UserImage,
             r.lastAccessed, u.UnitName, a.Gender
      FROM Accountant a
      INNER JOIN Registration r ON a.AccountantID = r.RegID
      INNER JOIN Unit u ON a.UnitID = u.UnitID
      WHERE a.AccountantID = ?
    `;
    const [rows] = await db.execute<AccountantRow[] & RowDataPacket[]>(sql, [id]);
    return rows[0];
  }

  async updateAccountant(id: number, data: AccountantPayload): Promise<{ message: string; affectedRows: number }> {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const regSql = `
        UPDATE Registration
        SET Name1 = ?, Name2 = ?, PhoneNo = ?, Email = ?, UserPassword = ?, Gender = ?, dLocation = ?, accStatus = ?, UserImage = ?
        WHERE RegID = ?
      `;
      const [regResult] = await connection.execute<ResultSetHeader>(regSql, [
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Password,
        data.Gender,
        data.dLocation ?? null,
        data.accStatus ?? 'Pending',
        data.UserImage ?? null,
        id,
      ]);

      const accountantSql = `
        UPDATE Accountant
        SET UnitID = ?, Name1 = ?, Name2 = ?, PhoneNo = ?, Email = ?, Gender = ?
        WHERE AccountantID = ?
      `;
      await connection.execute<ResultSetHeader>(accountantSql, [
        data.UnitID,
        data.Name1,
        data.Name2,
        data.PhoneNo,
        data.Email,
        data.Gender,
        id,
      ]);

      await connection.commit();
      return { message: 'Accountant updated successfully', affectedRows: regResult.affectedRows };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async deleteAccountant(id: number): Promise<{ message: string; affectedRows: number }> {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      await connection.execute<ResultSetHeader>('DELETE FROM Accountant WHERE AccountantID = ?', [id]);

      const [regResult] = await connection.execute<ResultSetHeader>(
        'DELETE FROM Registration WHERE RegID = ?',
        [id]
      );

      await connection.commit();
      return { message: 'Accountant deleted successfully', affectedRows: regResult.affectedRows };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}
