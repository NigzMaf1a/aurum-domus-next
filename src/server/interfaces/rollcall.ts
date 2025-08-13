import { RowDataPacket } from "mysql2";

export interface RollcallRow extends RowDataPacket {
  RollCallID: number
  RegID: number
  UnitID: string
  Name1: string
  Name2: string
  PhoneNo: string
  Email: string
  RollCallStatus: 'PRESENT' | 'ABSENT' | string
  RollCallDate: string
  RollCallTime: string
}

export interface AddRollCallPayload {
  regID: number
  name1: string
  name2: string
  phoneNo: string
  email: string
  status: 'PRESENT' | 'ABSENT' | string
  date: string
  time: string
}