import db from '../utils/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { HotelPayload, HotelRow } from '../interfaces/hotel'

export default class Hotel {
  constructor() {}

  // CREATE a new hotel
  async createHotel(data: HotelPayload): Promise<{ message: string; id: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      const sql = `
        INSERT INTO Hotel (OwnerID, HotelName, HotelEmail, HotelLogo)
        VALUES (?, ?, ?, ?)
      `

      const [result] = await connection.execute<ResultSetHeader>(sql, [
        data.OwnerID,
        data.HotelName,
        data.HotelEmail,
        data.HotelLogo ?? null,
      ])

      await connection.commit()
      return { message: 'Hotel created successfully', id: result.insertId }
    } catch (error) {
      await connection.rollback()
      console.error('DB insert error', error)
      throw error
    } finally {
      connection.release()
    }
  }

  // GET all hotels
  async getAllHotels(): Promise<HotelRow[]> {
    const sql = `
      SELECT h.HotelID, h.OwnerID, h.HotelName, h.HotelEmail, h.HotelLogo
      FROM Hotel h
      ORDER BY h.HotelName ASC
    `
    const [rows] = await db.execute<HotelRow[] & RowDataPacket[]>(sql)
    return rows
  }

  // GET hotel by ID
  async getHotelByID(id: number): Promise<HotelRow | undefined> {
    const sql = `
      SELECT h.HotelID, h.OwnerID, h.HotelName, h.HotelEmail, h.HotelLogo
      FROM Hotel h
      WHERE h.HotelID = ?
    `
    const [rows] = await db.execute<HotelRow[] & RowDataPacket[]>(sql, [id])
    return rows[0]
  }

  // UPDATE hotel
  async updateHotel(id: number, data: HotelPayload): Promise<{ message: string; affectedRows: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      const sql = `
        UPDATE Hotel
        SET OwnerID = ?, HotelName = ?, HotelEmail = ?, HotelLogo = ?
        WHERE HotelID = ?
      `
      const [result] = await connection.execute<ResultSetHeader>(sql, [
        data.OwnerID,
        data.HotelName,
        data.HotelEmail,
        data.HotelLogo ?? null,
        id,
      ])

      await connection.commit()
      return { message: 'Hotel updated successfully', affectedRows: result.affectedRows }
    } catch (error) {
      await connection.rollback()
      console.error('DB update error', error)
      throw error
    } finally {
      connection.release()
    }
  }

  // DELETE hotel
  async deleteHotel(id: number): Promise<{ message: string; affectedRows: number }> {
    const connection = await db.getConnection()
    try {
      await connection.beginTransaction()

      const [result] = await connection.execute<ResultSetHeader>('DELETE FROM Hotel WHERE HotelID = ?', [id])

      await connection.commit()
      return { message: 'Hotel deleted successfully', affectedRows: result.affectedRows }
    } catch (error) {
      await connection.rollback()
      console.error('DB delete error', error)
      throw error
    } finally {
      connection.release()
    }
  }
}
