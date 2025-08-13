import { RowDataPacket } from "mysql2";

export default interface BioRow extends RowDataPacket {
  BioID: number
  UnitID: string
  Instagram: string
  Facebook: string
  Twitter: string
  UnitPhone: string
  UnitLocation: string
  AboutUs: string
}