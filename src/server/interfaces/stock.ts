import { RowDataPacket } from "mysql2";

export interface StockRow extends RowDataPacket {
  StockID: number
  UnitID: number
  ItemName: string
  Quantity: number
  Price: number
}

export interface StockPayload {
  unitID: number
  itemName: string
  quantity: number
  price: number
}