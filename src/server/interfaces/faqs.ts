import { RowDataPacket } from "mysql2";

export interface FaqRow extends RowDataPacket {
  FAQID: number
  Question: string
  Answer: string
}