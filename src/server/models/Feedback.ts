import db from '../utils/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

interface FeedbackRow extends RowDataPacket {
  FeedbackID: number
  CustomerID: number
  Email: string
  Comments: string
  Rating: number | null
  Response: string | null
  FeedbackDate: Date
}

export default class Feedback {
  constructor() {}

  async addFeedback(
    customerID: number,
    email: string,
    comments: string,
    rating: number | null = null,
    response: string | null = null
  ): Promise<{ message: string; id: number }> {
    const sql = `
      INSERT INTO Feedback (CustomerID, Email, Comments, Rating, Response)
      VALUES (?, ?, ?, ?, ?)`
    const [result] = await db.execute<ResultSetHeader>(sql, [
      customerID,
      email,
      comments,
      rating,
      response
    ])
    return { message: 'Feedback added', id: result.insertId }
  }

  async getFeedback(customerID?: number): Promise<FeedbackRow[]> {
    const sql = customerID
      ? 'SELECT * FROM Feedback WHERE CustomerID = ? ORDER BY FeedbackDate DESC'
      : 'SELECT * FROM Feedback ORDER BY FeedbackDate DESC'
    const [rows] = customerID
      ? await db.execute<FeedbackRow[]>(sql, [customerID])
      : await db.execute<FeedbackRow[]>(sql)
    return rows
  }

  async updateFeedback(
    feedbackID: number,
    comments: string,
    response: string | null,
    rating: number | null
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `
      UPDATE Feedback 
      SET Comments = ?, Response = ?, Rating = ?
      WHERE FeedbackID = ?`
    const [result] = await db.execute<ResultSetHeader>(sql, [
      comments,
      response,
      rating,
      feedbackID
    ])
    return { message: 'Feedback updated', affectedRows: result.affectedRows }
  }

  async deleteFeedback(feedbackID: number): Promise<{ message: string; affectedRows: number }> {
    const [result] = await db.execute<ResultSetHeader>(
      'DELETE FROM Feedback WHERE FeedbackID = ?',
      [feedbackID]
    )
    return { message: 'Feedback deleted', affectedRows: result.affectedRows }
  }
}
