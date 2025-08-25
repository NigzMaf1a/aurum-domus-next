// interfaces/supplier.ts

export interface SupplierPayload {
  Name1: string
  Name2: string
  PhoneNo: string
  Email: string
  Password: string
  Gender: 'Male' | 'Female'
  dLocation?: string
  accStatus?: 'Pending' | 'Approved' | 'Inactive'
  UserImage?: string
}

export interface SupplierRow {
  SupplierID: number
  Name1: string
  Name2: string
  Email: string
  PhoneNo: string
  accStatus: string
  RegType: string
  UserImage: string | null
  lastAccessed: Date
}
