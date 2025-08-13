import { RowDataPacket } from "mysql2"

export default interface TableRow extends RowDataPacket {
  TableID: number
  UnitID: string
  TableName: string
  TableStatus: string
}