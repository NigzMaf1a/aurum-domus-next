import { RowDataPacket } from "mysql2";

export interface SalaryRow extends RowDataPacket {
  SalaryID: number
  FinanceID: number
  RegID: number
  SalaryAmount: number
  SalaryPaid: number
  SalaryReceived: number
  SalaryDate: string
  SalaryTime: string
}

export interface SalaryPayload {
  financeID: number
  regID: number
  salaryAmount: number
  salaryPaid: number
  salaryReceived: number
  salaryDate: string
  salaryTime: string
}