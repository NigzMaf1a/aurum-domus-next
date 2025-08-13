import {RowDataPacket } from 'mysql2'

export interface UnitRow extends RowDataPacket {
  UnitID: number
  UnitName: string
  UnitEmail: string
  UnitPhone: string
  UnitLocation: string
  UnitBalance: number
  Employees: number
}

export interface UnitPayload {
  unitName: string
  unitEmail: string
  unitPhone: string
  unitLocation: string
  unitBalance: number
  employees?: number
}