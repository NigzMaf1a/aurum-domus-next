import { RowDataPacket } from "mysql2";

export interface FinanceRow extends RowDataPacket {
  ID: number
  UnitID: string
  Amount: number
  Total: number
  Balance: number
  TransactionType: string
  TransactionDate: string
}

export interface FinanceUpdatePayload {
  Amount?: number
  Total?: number
  Balance?: number
  TransactionType?: string
  TransactionDate?: string
}