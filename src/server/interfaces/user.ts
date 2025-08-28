import {RowDataPacket } from 'mysql2';

export interface UserRow extends RowDataPacket {
  RegID: number
  Name1: string
  Name2: string
  PhoneNo: string
  Email: string
  UserPassword: string
  Gender: string
  RegType: string
  dLocation?: string
  accStatus: string
  Image:string
}

export interface UserPayload {
  Name1: string
  Name2: string
  Phone: string
  Email: string
  UserPassword: string
  Gender: string
  RegType: string
  dLocation?: string
  accStatus?: string
  Image:string
}