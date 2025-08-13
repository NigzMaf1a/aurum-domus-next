import {RowDataPacket } from 'mysql2';

export interface UserRow extends RowDataPacket {
  RegID: number
  Name1: string
  Name2: string
  PhoneNo: string
  Email: string
  Password: string
  Gender: string
  RegType: string
  dLocation: string
  accStatus: string
}

export interface UserPayload {
  name1: string
  name2: string
  phone: string
  email: string
  password: string
  gender: string
  regtype: string
  location: string
  accstatus?: string
}