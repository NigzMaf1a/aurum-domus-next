import db from '../utils/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

interface BioRow extends RowDataPacket {
  BioID: number
  UnitID: string
  Instagram: string
  Facebook: string
  Twitter: string
  UnitPhone: string
  UnitLocation: string
  AboutUs: string
}

export default class Bio {
  constructor() {}

  async addBio(
    unitID: string,
    instagram: string,
    facebook: string,
    twitter: string,
    unitPhone: string,
    unitLocation: string,
    aboutUs: string
  ): Promise<{ message: string; bioID: number }> {
    const sql = `
      INSERT INTO Bio (UnitID, Instagram, Facebook, Twitter, UnitPhone, UnitLocation, AboutUs)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `
    const [result] = await db.execute<ResultSetHeader>(sql, [
      unitID,
      instagram,
      facebook,
      twitter,
      unitPhone,
      unitLocation,
      aboutUs
    ])
    return { message: 'Bio added', bioID: result.insertId }
  }

  async getBio(unitID?: string): Promise<BioRow[]> {
    const sql = unitID
      ? `SELECT * FROM Bio WHERE UnitID = ?`
      : `SELECT * FROM Bio`
    const [rows] = unitID
      ? await db.execute<BioRow[]>(sql, [unitID])
      : await db.execute<BioRow[]>(sql)
    return rows
  }

  async updateBio(
    bioID: number,
    unitID: string,
    instagram: string,
    facebook: string,
    twitter: string,
    unitPhone: string,
    unitLocation: string,
    aboutUs: string
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Bio
      SET UnitID = ?, Instagram = ?, Facebook = ?, Twitter = ?, UnitPhone = ?, UnitLocation = ?, AboutUs = ?
      WHERE BioID = ?
    `
    const [result] = await db.execute<ResultSetHeader>(sql, [
      unitID,
      instagram,
      facebook,
      twitter,
      unitPhone,
      unitLocation,
      aboutUs,
      bioID
    ])
    return { message: 'Bio updated', affectedRows: result.affectedRows }
  }

  async deleteBio(bioID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Bio WHERE BioID = ?`
    const [result] = await db.execute<ResultSetHeader>(sql, [bioID])
    return { message: 'Bio deleted', affectedRows: result.affectedRows }
  }
}
