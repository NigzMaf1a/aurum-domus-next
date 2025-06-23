import db from '../utils/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

interface FaqRow extends RowDataPacket {
  FAQID: number
  Question: string
  Answer: string
}

export default class Faqs {
  constructor() {}

  async addFaq(question: string, answer: string): Promise<{ message: string; id: number }> {
    const sql = `INSERT INTO FAQs (Question, Answer) VALUES (?, ?)`
    const [result] = await db.execute<ResultSetHeader>(sql, [question, answer])
    return { message: 'FAQ added', id: result.insertId }
  }

  async getFaqs(): Promise<FaqRow[]> {
    const sql = `SELECT * FROM FAQs ORDER BY FAQID`
    const [rows] = await db.execute<FaqRow[]>(sql)
    return rows
  }

  async updateFaq(faqID: number, question: string, answer: string): Promise<{ message: string; affectedRows: number }> {
    const sql = `UPDATE FAQs SET Question = ?, Answer = ? WHERE FAQID = ?`
    const [result] = await db.execute<ResultSetHeader>(sql, [question, answer, faqID])
    return { message: 'FAQ updated', affectedRows: result.affectedRows }
  }

  async deleteFaq(faqID: number): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM FAQs WHERE FAQID = ?`
    const [result] = await db.execute<ResultSetHeader>(sql, [faqID])
    return { message: 'FAQ deleted', affectedRows: result.affectedRows }
  }
}
