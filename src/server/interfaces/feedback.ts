import { RowDataPacket } from "mysql2";

export default interface FeedbackRow extends RowDataPacket {
  FeedbackID: number
  CustomerID: number
  Email: string
  Comments: string
  Rating: number | null
  Response: string | null
  FeedbackDate: Date
}